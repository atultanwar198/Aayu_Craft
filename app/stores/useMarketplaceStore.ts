"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { adminReviews as seedReviews, customerOrders as seedOrders, customRequests as seedRequests, products as seedProducts, type Product } from "@/app/data/mockData";

export type RequestStatus =
  | "Pending Admin Review"
  | "Needs More Information"
  | "Rejected"
  | "Accepted"
  | "Quotation Submitted"
  | "Quotation Approved"
  | "Quotation Rejected"
  | "Customer Accepted"
  | "Customer Declined"
  | "In Production"
  | "Completed";

export type CustomRequest = {
  id: string;
  customerName: string;
  customerContact: string;
  category: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  materials: string[];
  requestDate: string;
  status: RequestStatus;
  assignedArtisan: string;
  adminNotes: string;
  history: string[];
  referenceImage?: string;
  quotationAmount?: number;
  quotationNote?: string;
};

export type MarketplaceOrder = {
  id: string;
  item: string;
  artisan: string;
  status: string;
  total: number;
};

export type MarketplaceReview = {
  id: string;
  customer: string;
  artisan: string;
  rating: number;
  comment: string;
};

type StoreState = {
  requests: CustomRequest[];
  orders: MarketplaceOrder[];
  reviews: MarketplaceReview[];
  cart: Record<string, number>;
  wishlist: string[];
  artisanProducts: Product[];
  portfolioItems: { id: string; title: string; image: string }[];
  currentUser: { name: string; email: string; role: "customer" | "artisan" | "admin" } | null;
  addRequest: (request: Omit<CustomRequest, "id" | "status" | "requestDate" | "assignedArtisan" | "adminNotes" | "history">) => void;
  updateRequest: (id: string, updates: Partial<CustomRequest>, historyEntry?: string) => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  checkout: () => boolean;
  addReview: (review: Omit<MarketplaceReview, "id">) => void;
  setCartQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  addArtisanProduct: (product: Product) => void;
  removeArtisanProduct: (productId: string) => void;
  addPortfolioItem: (item: { title: string; image: string }) => void;
  removePortfolioItem: (itemId: string) => void;
  setCurrentUser: (user: StoreState["currentUser"]) => void;
  signOut: () => void;
};

export const useMarketplaceStore = create<StoreState>()(
  persist(
    (set, get) => ({
      requests: seedRequests.map((request) => ({
        ...request,
        status: request.status === "Approved" ? "Accepted" : request.status as RequestStatus,
      })),
      orders: seedOrders,
      reviews: seedReviews,
      cart: {},
      wishlist: [],
      artisanProducts: [],
      portfolioItems: [],
      currentUser: null,
      addRequest: (request) =>
        set((state) => ({
          requests: [
            {
              ...request,
              id: `CR-${Date.now().toString().slice(-6)}`,
              status: "Pending Admin Review",
              requestDate: new Date().toISOString().slice(0, 10),
              assignedArtisan: "",
              adminNotes: "",
              history: ["Submitted by customer"],
            },
            ...state.requests,
          ],
        })),
      updateRequest: (id, updates, historyEntry) =>
        set((state) => ({
          requests: state.requests.map((request) =>
            request.id === id
              ? {
                  ...request,
                  ...updates,
                  history: historyEntry ? [...request.history, historyEntry] : request.history,
                }
              : request,
          ),
        })),
      addToCart: (productId) =>
        set((state) => ({ cart: { ...state.cart, [productId]: (state.cart[productId] ?? 0) + 1 } })),
      removeFromCart: (productId) =>
        set((state) => {
          const cart = { ...state.cart };
          delete cart[productId];
          return { cart };
        }),
      checkout: () =>
        {
          const cart = get().cart;
          const newOrders = Object.entries(cart).flatMap(([productId, quantity]) => {
            const product = seedProducts.find((item) => item.id === productId);
            return product ? [{
              id: `ORD-${Date.now().toString().slice(-6)}-${productId}`,
              item: product.title,
              artisan: product.artisan,
              status: "Processing",
              total: product.price * quantity,
            }] : [];
          });
          if (newOrders.length === 0) return false;
          set((state) => ({ orders: [...newOrders, ...state.orders], cart: {} }));
          return true;
        },
      addReview: (review) =>
        set((state) => ({ reviews: [{ ...review, id: `REV-${Date.now().toString().slice(-6)}` }, ...state.reviews] })),
      setCartQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            const cart = { ...state.cart };
            delete cart[productId];
            return { cart };
          }
          return { cart: { ...state.cart, [productId]: quantity } };
        }),
      toggleWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        })),
      addArtisanProduct: (product) => set((state) => ({ artisanProducts: [product, ...state.artisanProducts] })),
      removeArtisanProduct: (productId) =>
        set((state) => ({ artisanProducts: state.artisanProducts.filter((product) => product.id !== productId) })),
      addPortfolioItem: (item) =>
        set((state) => ({ portfolioItems: [{ ...item, id: `PORT-${Date.now()}` }, ...state.portfolioItems] })),
      removePortfolioItem: (itemId) =>
        set((state) => ({ portfolioItems: state.portfolioItems.filter((item) => item.id !== itemId) })),
      setCurrentUser: (currentUser) => set({ currentUser }),
      signOut: () => set({ currentUser: null }),
    }),
    { name: "aayucraft-marketplace", skipHydration: true },
  ),
);

export function getProductsInCart(cart: Record<string, number>, products: Product[]) {
  return Object.entries(cart)
    .map(([id, quantity]) => {
      const product = products.find((item) => item.id === id);
      return product ? { product, quantity } : null;
    })
    .filter((entry): entry is { product: Product; quantity: number } => entry !== null);
}
