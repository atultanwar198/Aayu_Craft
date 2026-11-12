import type { LucideIcon } from "lucide-react";

import {
  Sparkles,
  CircleDashed,
  Shirt,
  Layers,
  Palette,
  Gem,
  Armchair,
  Shapes,
} from "lucide-react";
export type Category = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  image: string;
};
export type Artisan = {
  id: string;
  name: string;
  location: string;
  specialty: string;
  experience: string;
  rating: number;
  bio: string;
  profileImage: string;
  portfolio: string[];
  skills: string[];
  featured?: boolean;
};

export type Product = {
  id: string;
  title: string;
  artisan: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  materials: string[];
  dimensions: string;
  featured?: boolean;
};


export const categories: Category[] = [
  { 
    id: "paper", 
    name: "Paper Craft", 
    description: "Handmade paper art, collage and journals.", 
    icon: Sparkles, 
    accent: "#A85D42",  
    image: 
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800", 
  },
  { 
    id: "clay", 
    name: "Clay Modelling", 
    description: "Terracotta, sculptural décor and utility pieces.", 
    icon: CircleDashed, 
    accent: "#D6B77A", 
    image: 
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800",
    },
   {
    id: "decorative",
    name: "Decorative Art",
    description: "Wall décor, keepsakes and statement accents.",
    icon: Sparkles,
    accent: "#66734E",
    image:
      "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "fashion",
    name: "Fashion & Clothing",
    description: "Wearable hand-crafted textiles and styles.",
    icon: Shirt,
    accent: "#A85D42",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "handloom",
    name: "Handloom",
    description: "Woven fabrics, shawls and heirloom essentials.",
    icon: Layers,
    accent: "#66734E",
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "painting",
    name: "Painting",
    description: "Original miniatures and artwork on canvas.",
    icon: Palette,
    accent: "#D6B77A",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "jewellery",
    name: "Jewellery",
    description: "Handcrafted adornments and artisan finishes.",
    icon: Gem,
    accent: "#A85D42",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "wood",
    name: "Wood Craft",
    description: "Custom furniture and carved home essentials.",
    icon: Armchair,
    accent: "#66734E",
    image:
      "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "other",
    name: "Other Handmade Art",
    description: "Creative hybrid pieces from small studios.",
    icon: Shapes,
    accent: "#D6B77A",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&auto=format&fit=crop&q=80",
  },
];

export const artisans: Artisan[] = [
  {
    id: "ananya-sharma",
    name: "Ananya Sharma",
    location: "Jaipur, Rajasthan",
    specialty: "Handloom & Textiles",
    experience: "8 years",
    rating: 4.9,
    bio: "Ananya blends regional dyeing traditions with contemporary silhouettes to craft heirloom-ready textiles.",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    ],
    skills: ["Handloom weaving", "Natural dyes", "Custom motifs"],
    featured: true,
  },
  {
    id: "rohit-verma",
    name: "Rohit Verma",
    location: "Bhubaneswar, Odisha",
    specialty: "Wood Craft",
    experience: "12 years",
    rating: 4.8,
    bio: "Rohit carves functional art from sustainably sourced timber, creating soulful statement pieces for modern homes.",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    ],
    skills: ["Solid wood carving", "Custom furniture", "Detailing"],
    featured: true,
  },
  {
    id: "meera-patel",
    name: "Meera Patel",
    location: "Ahmedabad, Gujarat",
    specialty: "Clay Modelling",
    experience: "6 years",
    rating: 4.9,
    bio: "Meera creates sculptural ceramics that merge utility with storytelling through texture, form and glaze.",
    profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80",
    ],
    skills: ["Terracotta", "Glaze finishes", "Custom ceramics"],
    featured: true,
  },
  {
    id: "aditya-nair",
    name: "Aditya Nair",
    location: "Kochi, Kerala",
    specialty: "Painting & Illustration",
    experience: "10 years",
    rating: 4.7,
    bio: "Aditya paints atmospheric storyscapes inspired by Indian folklore and coastal landscapes.",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
    ],
    skills: ["Miniature art", "Custom canvas", "Illustrations"],
  },
];

export const products: Product[] = [
  {
    id: "p-1001",
    title: "Lotus Weave Throw",
    artisan: "Ananya Sharma",
    category: "Handloom",
    price: 3290,
    originalPrice: 4590,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    description: "A handwoven throw with natural dyed lotus fibre, plush and lightweight for cozy interiors.",
    materials: ["Cotton", "Natural dyes", "Art silk"],
    dimensions: "180 x 130 cm",
    featured: true,
  },
  {
    id: "p-1002",
    title: "Rangoli Clay Vase",
    artisan: "Meera Patel",
    category: "Clay Modelling",
    price: 2450,
    originalPrice: 3100,
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80",
    description: "Hand-thrown ceramic vase with playful patterns and a subtle matte glaze finish.",
    materials: ["Clay", "Matte glaze"],
    dimensions: "22 x 12 cm",
    featured: true,
  },
  {
    id: "p-1003",
    title: "Saffron Wood Tray",
    artisan: "Rohit Verma",
    category: "Wood Craft",
    price: 4120,
    originalPrice: 5200,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    description: "Carved wooden serving tray with a rich grain and smooth hand-finished edges.",
    materials: ["Sheesham wood", "Natural oil"],
    dimensions: "42 x 28 cm",
    featured: true,
  },
  {
    id: "p-1004",
    title: "Monsoon Story Canvas",
    artisan: "Aditya Nair",
    category: "Painting",
    price: 6800,
    originalPrice: 8200,
    image: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=900&q=80",
    description: "Original hand-painted canvas inspired by monsoon skies and nostalgic coastal memories.",
    materials: ["Acrylic", "Canvas"],
    dimensions: "60 x 80 cm",
    featured: true,
  },
];


export const adminStats = [
  { label: "Total registered customers", value: 1842 },
  { label: "Total registered artisans", value: 264 },
  { label: "Total products", value: 1320 },
  { label: "Total custom requests", value: 481 },
  { label: "Pending requests", value: 63 },
  { label: "Accepted requests", value: 229 },
  { label: "Rejected requests", value: 28 },
  { label: "Total orders", value: 890 },
];

export const recentActivity = [
  "New artisan verification request from Niyati Arts Studio.",
  "Custom request CR-2048 was assigned to Ananya Sharma.",
  "Product review flagged for slow shipment resolution.",
  "Four new customer signups were approved today.",
];

export const customRequests = [
  {
    id: "CR-2048",
    customerName: "Neha Gupta",
    customerContact: "neha.gupta@example.com",
    category: "Wood Craft",
    title: "Hand-carved tea tray for a family heirloom",
    description: "Need a solid wood tea tray with floral patterns and a matte finish for gifting.",
    budget: 4800,
    deadline: "2026-11-30",
    materials: ["Sheesham wood", "Natural oil"],
    requestDate: "2026-11-04",
    status: "Pending Admin Review",
    assignedArtisan: "Rohit Verma",
    adminNotes: "Reference photos included; artisan match is suitable.",
    history: ["Submitted by customer", "Admin review in progress"],
  },
  {
    id: "CR-2051",
    customerName: "Sarthak Iyer",
    customerContact: "sarthak.iyer@example.com",
    category: "Decorative Art",
    title: "Wall hanging with folklore-inspired motifs",
    description: "Looking for a large handcrafted wall hanging inspired by temple murals.",
    budget: 6200,
    deadline: "2026-12-15",
    materials: ["Cotton", "Wood", "Paint"],
    requestDate: "2026-11-07",
    status: "Approved",
    assignedArtisan: "Aditya Nair",
    adminNotes: "Approved after stakeholders reviewed references.",
    history: ["Submitted by customer", "Admin accepted", "Artisan assigned"],
  },
];

export const customerOrders = [
  { id: "ORD-4412", item: "Lotus Weave Throw", artisan: "Ananya Sharma", status: "In production", total: 3290 },
  { id: "ORD-4419", item: "Rangoli Clay Vase", artisan: "Meera Patel", status: "Shipped", total: 2450 },
  { id: "ORD-4424", item: "Monsoon Story Canvas", artisan: "Aditya Nair", status: "Delivered", total: 6800 },
];

export const dashboardNav = {
  customer: [
    { href: "/customer/dashboard", label: "Dashboard" },
    { href: "/customer/artisans", label: "Artisans" },
    { href: "/customer/products", label: "Products" },
    { href: "/customer/orders", label: "Orders" },
    { href: "/customer/custom-requests", label: "Custom Requests" },
    { href: "/customer/wishlist", label: "Wishlist" },
    { href: "/customer/cart", label: "Cart" },
    { href: "/customer/notifications", label: "Notifications" },
    { href: "/customer/profile", label: "Profile" },
    { href: "/customer/settings", label: "Settings" },
  ],
  artisan: [
    { href: "/artisan/dashboard", label: "Dashboard" },
    { href: "/artisan/profile", label: "Profile" },
    { href: "/artisan/portfolio", label: "Portfolio" },
    { href: "/artisan/products", label: "Products" },
    { href: "/artisan/requests", label: "Requests" },
    { href: "/artisan/orders", label: "Orders" },
    { href: "/artisan/reviews", label: "Reviews" },
    { href: "/artisan/earnings", label: "Earnings" },
    { href: "/artisan/notifications", label: "Notifications" },
    { href: "/artisan/settings", label: "Settings" },
  ],
  admin: [
    { href: "/admin/dashboard", label: "Overview" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/artisans", label: "Artisans" },
    { href: "/admin/artisan-verification", label: "Verification" },
    { href: "/admin/categories", label: "Categories" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/custom-requests", label: "Custom Requests" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/reviews", label: "Reviews" },
    { href: "/admin/reports", label: "Reports" },
    { href: "/admin/notifications", label: "Notifications" },
    { href: "/admin/settings", label: "Settings" },
  ],
};

export const latestRegistrations = [
  { name: "Priya Nambiar", role: "Customer" },
  { name: "Srishti & Co.", role: "Artisan studio" },
  { name: "Milan Dutta", role: "Customer" },
  { name: "Nila Craft House", role: "Artisan studio" },
];

export const adminReviews = [
  { id: "REV-183", customer: "Kavya Menon", artisan: "Ananya Sharma", rating: 5, comment: "Beautiful craftsmanship and on-time delivery." },
  { id: "REV-184", customer: "Rohit Sen", artisan: "Meera Patel", rating: 4, comment: "The custom piece was elegant and thoughtful." },
];
