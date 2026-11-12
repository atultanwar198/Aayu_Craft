"use client";

import { useMarketplaceStore } from "@/app/stores/useMarketplaceStore";
import { CustomRequestForm } from "@/app/components/request-workflow";

export function CustomerRequestList() {
  const requests = useMarketplaceStore((state) => state.requests);
  const updateRequest = useMarketplaceStore((state) => state.updateRequest);

  return (
    <div className="space-y-6">
      <CustomRequestForm />
      {requests.map((request) => (
        <article key={request.id} className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-primary)]">{request.id} · {request.category}</div>
              <h2 className="mt-2 font-display text-2xl font-bold">{request.title}</h2>
            </div>
            <span className="rounded-full bg-[rgba(168,93,66,0.1)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)]">{request.status}</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--color-text)]/70">{request.description}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div><div className="text-xs uppercase tracking-[0.14em] text-[var(--color-text)]/50">Budget</div><div className="mt-2 font-semibold">₹{request.budget.toLocaleString("en-IN")}</div></div>
            <div><div className="text-xs uppercase tracking-[0.14em] text-[var(--color-text)]/50">Deadline</div><div className="mt-2 font-semibold">{request.deadline}</div></div>
            <div><div className="text-xs uppercase tracking-[0.14em] text-[var(--color-text)]/50">Assigned artisan</div><div className="mt-2 font-semibold">{request.assignedArtisan || "Awaiting admin match"}</div></div>
          </div>
          {request.referenceImage && <img src={request.referenceImage} alt={`Reference for ${request.title}`} className="mt-4 max-h-56 rounded-2xl object-cover" />}
          {request.quotationAmount && (
            <div className="mt-5 rounded-2xl bg-white p-4">
              <div className="font-semibold">Artisan quote: ₹{request.quotationAmount.toLocaleString("en-IN")}</div>
              <p className="mt-1 text-sm text-[var(--color-text)]/70">{request.quotationNote}</p>
              {request.status === "Quotation Approved" && (
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={() => updateRequest(request.id, { status: "Customer Accepted" }, "Customer accepted quotation; custom order confirmed")} className="btn-primary">Accept quotation</button>
                  <button type="button" onClick={() => updateRequest(request.id, { status: "Customer Declined" }, "Customer declined quotation")} className="btn-secondary">Decline</button>
                </div>
              )}
            </div>
          )}
          <details className="mt-4 text-sm">
            <summary className="cursor-pointer font-semibold">Request history</summary>
            <ol className="mt-2 space-y-1 text-[var(--color-text)]/65">{request.history.map((entry, index) => <li key={`${entry}-${index}`}>• {entry}</li>)}</ol>
          </details>
        </article>
      ))}
    </div>
  );
}
