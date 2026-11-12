"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { artisans, categories } from "@/app/data/mockData";
import { useMarketplaceStore } from "@/app/stores/useMarketplaceStore";

const requestSchema = z.object({
  title: z.string().trim().min(5, "Add a little more detail to the title."),
  category: z.string().min(1, "Choose a category."),
  description: z.string().trim().min(20, "Describe your idea in at least 20 characters."),
  budget: z.coerce.number().positive("Enter a budget greater than zero."),
  deadline: z.string().min(1, "Choose a preferred deadline."),
  materials: z.string().trim().min(2, "List your preferred materials."),
  referenceImage: z.string().url("Enter a valid image URL.").or(z.literal("")),
});

type RequestFormValues = z.input<typeof requestSchema>;

export function CustomRequestForm() {
  const addRequest = useMarketplaceStore((state) => state.addRequest);
  const currentUser = useMarketplaceStore((state) => state.currentUser);
  const [submitted, setSubmitted] = useState(false);
  const [fileError, setFileError] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<RequestFormValues>({
    defaultValues: { title: "", category: "", description: "", budget: 0, deadline: "", materials: "", referenceImage: "" },
  });

  const onSubmit = (values: RequestFormValues) => {
    const parsed = requestSchema.safeParse(values);
    if (!parsed.success) return;
    if (parsed.data.deadline < new Date().toISOString().slice(0, 10)) {
      setError("deadline", { type: "validate", message: "Choose today or a future date." });
      return;
    }
    addRequest({
      customerName: currentUser?.name ?? "Aisha Mehra",
      customerContact: currentUser?.email ?? "aisha.mehra@example.com",
      category: parsed.data.category,
      title: parsed.data.title,
      description: parsed.data.description,
      budget: parsed.data.budget,
      deadline: parsed.data.deadline,
      materials: parsed.data.materials.split(",").map((material) => material.trim()).filter(Boolean),
      referenceImage: parsed.data.referenceImage || undefined,
    });
    reset();
    setSubmitted(true);
  };

  const uploadReference = (file?: File) => {
    setFileError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setFileError("Choose an image file.");
      return;
    }
    if (file.size > 1024 * 1024) {
      setFileError("Image must be 1 MB or smaller for this local demo.");
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => setFileError("The image could not be read. Try another file.");
    reader.onload = () => setValue("referenceImage", String(reader.result), { shouldValidate: true });
    reader.readAsDataURL(file);
  };

  return (
    <section className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5">
      <div className="mb-5">
        <p className="eyebrow">Start a commission</p>
        <h2 className="mt-2 font-display text-2xl font-bold">Tell us what you have in mind</h2>
        <p className="mt-1 text-sm text-[var(--color-text)]/65">Your request begins in admin review. The team will match it with an artisan.</p>
      </div>
      {submitted && <p role="status" className="mb-4 rounded-xl bg-[#E8EFE3] p-3 text-sm text-[#405638]">Request submitted for admin review.</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium">
          Request title
          <input {...register("title")} className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5" placeholder="e.g. A hand-carved keepsake box" />
          {errors.title && <span className="mt-1 block text-xs text-red-700">{errors.title.message}</span>}
        </label>
        <label className="text-sm font-medium">
          Category
          <select {...register("category")} className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5">
            <option value="">Select a craft</option>
            {categories.map((category) => <option key={category.id}>{category.name}</option>)}
          </select>
          {errors.category && <span className="mt-1 block text-xs text-red-700">{errors.category.message}</span>}
        </label>
        <label className="text-sm font-medium">
          Budget (₹)
          <input {...register("budget")} type="number" min="1" className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5" placeholder="5000" />
          {errors.budget && <span className="mt-1 block text-xs text-red-700">{errors.budget.message}</span>}
        </label>
        <label className="text-sm font-medium">
          Preferred deadline
          <input {...register("deadline")} type="date" className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5" />
          {errors.deadline && <span className="mt-1 block text-xs text-red-700">{errors.deadline.message}</span>}
        </label>
        <label className="text-sm font-medium md:col-span-2">
          Describe the idea, dimensions, and details
          <textarea {...register("description")} rows={4} className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5" placeholder="Share the purpose, size, design, and any details that matter." />
          {errors.description && <span className="mt-1 block text-xs text-red-700">{errors.description.message}</span>}
        </label>
        <label className="text-sm font-medium md:col-span-2">
          Preferred materials (comma separated)
          <input {...register("materials")} className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5" placeholder="Sheesham wood, natural oil" />
          {errors.materials && <span className="mt-1 block text-xs text-red-700">{errors.materials.message}</span>}
        </label>
        <label className="text-sm font-medium md:col-span-2">
          Reference image
          <input type="url" {...register("referenceImage")} className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5" placeholder="https://..." />
          <span className="mt-1 block text-xs font-normal text-[var(--color-text)]/60">Paste an image URL or upload an image up to 1 MB.</span>
          <input type="file" accept="image/*" onChange={(event) => uploadReference(event.target.files?.[0])} className="mt-2 block w-full text-sm" />
          {(errors.referenceImage || fileError) && <span className="mt-1 block text-xs text-red-700">{fileError || errors.referenceImage?.message}</span>}
        </label>
        <button type="submit" className="btn-primary w-fit md:col-span-2">Submit custom request</button>
      </form>
    </section>
  );
}

export function AdminRequestManager() {
  const requests = useMarketplaceStore((state) => state.requests);
  const updateRequest = useMarketplaceStore((state) => state.updateRequest);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = useMemo(() => requests.find((request) => request.id === selectedId), [requests, selectedId]);

  const act = (id: string, status: "Accepted" | "Rejected" | "Needs More Information") => {
    if ((status === "Accepted" || status === "Rejected") && !window.confirm(`Confirm ${status.toLowerCase()} for this request?`)) return;
    updateRequest(id, { status }, `Admin changed status to ${status}`);
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-3">
        {requests.map((request) => (
          <button key={request.id} type="button" onClick={() => setSelectedId(request.id)} className={`w-full rounded-[20px] border p-4 text-left ${selectedId === request.id ? "border-[var(--color-primary)] bg-[#F8F0E7]" : "border-[var(--color-border)] bg-[#F9F7F3]"}`}>
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.14em] text-[var(--color-primary)]">{request.id}</span>
              <span className="text-xs font-semibold">{request.status}</span>
            </div>
            <div className="mt-2 font-semibold">{request.title}</div>
            <div className="mt-1 text-sm text-[var(--color-text)]/65">{request.customerName} · {request.category}</div>
          </button>
        ))}
        {requests.length === 0 && <p className="rounded-2xl bg-[#F9F7F3] p-5 text-sm">No custom requests yet.</p>}
      </div>
      {selected ? (
        <div className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-primary)]">{selected.id} · {selected.category}</p>
              <h2 className="mt-2 font-display text-2xl font-bold">{selected.title}</h2>
            </div>
            <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold">{selected.status}</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--color-text)]/75">{selected.description}</p>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <p><strong>Customer:</strong> {selected.customerName}</p>
            <p><strong>Contact:</strong> {selected.customerContact}</p>
            <p><strong>Budget:</strong> ₹{selected.budget.toLocaleString("en-IN")}</p>
            <p><strong>Deadline:</strong> {selected.deadline}</p>
            <p><strong>Materials:</strong> {selected.materials.join(", ")}</p>
            <p><strong>Submitted:</strong> {selected.requestDate}</p>
            <p><strong>Artisan:</strong> {selected.assignedArtisan || "Not assigned"}</p>
          </div>
          {selected.referenceImage && <img src={selected.referenceImage} alt="Customer reference" className="mt-4 max-h-64 rounded-2xl object-cover" />}
          {selected.quotationAmount && (
            <div className="mt-4 rounded-2xl bg-white p-4 text-sm">
              <strong>Artisan quotation: ₹{selected.quotationAmount.toLocaleString("en-IN")}</strong>
              <p className="mt-1">{selected.quotationNote}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" onClick={() => updateRequest(selected.id, { status: "Quotation Approved" }, "Admin approved artisan quotation")} className="btn-primary">Approve quotation</button>
                <button type="button" onClick={() => updateRequest(selected.id, { status: "Quotation Rejected" }, "Admin rejected artisan quotation")} className="btn-secondary">Reject quotation</button>
              </div>
            </div>
          )}
          <label className="mt-5 block text-sm font-medium">
            Assign artisan
            <select value={selected.assignedArtisan} onChange={(event) => updateRequest(selected.id, { assignedArtisan: event.target.value }, `Assigned to ${event.target.value}`)} className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5">
              <option value="">Unassigned</option>
              {artisans.map((artisan) => <option key={artisan.id}>{artisan.name}</option>)}
            </select>
          </label>
          <label className="mt-4 block text-sm font-medium">
            Internal admin notes
            <textarea defaultValue={selected.adminNotes} onBlur={(event) => updateRequest(selected.id, { adminNotes: event.target.value })} rows={2} className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5" />
          </label>
          <div className="mt-4">
            <p className="text-sm font-semibold">Request history</p>
            <ol className="mt-2 space-y-1 text-sm text-[var(--color-text)]/65">{selected.history.map((entry, index) => <li key={`${entry}-${index}`}>• {entry}</li>)}</ol>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={() => act(selected.id, "Accepted")} className="btn-primary">Accept request</button>
            <button type="button" onClick={() => act(selected.id, "Rejected")} className="btn-secondary">Reject request</button>
            <button type="button" onClick={() => act(selected.id, "Needs More Information")} className="btn-secondary">Request more information</button>
          </div>
        </div>
      ) : (
        <div className="flex min-h-64 items-center justify-center rounded-[24px] border border-dashed border-[var(--color-border)] bg-[#F9F7F3] text-sm text-[var(--color-text)]/60">Select a request to review all details and manage its workflow.</div>
      )}
    </div>
  );
}

export function ArtisanQuotationForm() {
  const requests = useMarketplaceStore((state) => state.requests);
  const updateRequest = useMarketplaceStore((state) => state.updateRequest);
  const eligible = requests.filter((request) => (
    (request.status === "Accepted" || request.status === "Customer Accepted" || request.status === "In Production")
    && Boolean(request.assignedArtisan)
  ));
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  return (
    <div className="space-y-4">
      {eligible.map((request) => (
        <div key={request.id} className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5">
          <div className="text-xs uppercase tracking-[0.14em] text-[var(--color-primary)]">{request.id} · Assigned to {request.assignedArtisan}</div>
          <h2 className="mt-2 font-display text-2xl font-bold">{request.title}</h2>
          <p className="mt-2 text-sm text-[var(--color-text)]/70">{request.description}</p>
          <p className="mt-2 text-sm">Budget: ₹{request.budget.toLocaleString("en-IN")} · Due {request.deadline}</p>
          {request.status === "Accepted" ? (
            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_2fr_auto]">
              <input aria-label="Quotation amount" type="number" min="1" value={amounts[request.id] ?? ""} onChange={(event) => setAmounts({ ...amounts, [request.id]: event.target.value })} placeholder="Quotation amount (₹)" className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5" />
              <input aria-label="Quotation details" value={notes[request.id] ?? ""} onChange={(event) => setNotes({ ...notes, [request.id]: event.target.value })} placeholder="Describe scope and delivery estimate" className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5" />
              <button type="button" onClick={() => {
                const amount = Number(amounts[request.id]);
                if (!Number.isFinite(amount) || amount <= 0 || !notes[request.id]?.trim()) return;
                updateRequest(request.id, { quotationAmount: amount, quotationNote: notes[request.id].trim(), status: "Quotation Submitted" }, "Artisan submitted quotation");
              }} className="btn-primary">Send quote</button>
            </div>
          ) : (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {request.quotationAmount && <span className="rounded-full bg-white px-3 py-2 text-sm">Quote: ₹{request.quotationAmount.toLocaleString("en-IN")} · {request.status}</span>}
              {request.status === "Customer Accepted" && <button type="button" onClick={() => updateRequest(request.id, { status: "In Production" }, "Artisan started production")} className="btn-primary">Start production</button>}
              {request.status === "In Production" && <button type="button" onClick={() => updateRequest(request.id, { status: "Completed" }, "Artisan marked work complete")} className="btn-secondary">Mark complete</button>}
            </div>
          )}
        </div>
      ))}
      {eligible.length === 0 && <p className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5 text-sm text-[var(--color-text)]/70">No admin-approved requests are assigned yet.</p>}
    </div>
  );
}
