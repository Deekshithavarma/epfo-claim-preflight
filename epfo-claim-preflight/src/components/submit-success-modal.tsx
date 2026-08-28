"use client";

import { Check, X } from "lucide-react";

export function SubmitSuccessModal({
  onViewPdf,
  onClose,
}: {
  onViewPdf: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto bg-black/45 px-3 py-6 sm:px-4" role="dialog" aria-modal="true" aria-labelledby="submit-success-title">
      <div className="relative w-full max-w-[420px] bg-white px-5 py-8 text-center shadow-[0_12px_40px_rgba(0,0,0,0.28)] sm:px-8 sm:py-10">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-2 top-2 rounded p-2 text-[#5b6573] hover:bg-slate-100 hover:text-[#222] sm:right-3 sm:top-3"
        >
          <X size={20} strokeWidth={2.4} />
        </button>
        <p id="submit-success-title" className="px-6 text-[1.05rem] font-medium leading-snug text-[#222] sm:text-[1.15rem]">
          Online Claim Submitted Successfully.
        </p>

        <div className="relative mx-auto mt-6 h-36 w-52 sm:mt-8 sm:h-48 sm:w-64">
          <span className="absolute left-6 top-10 h-2.5 w-36 -rotate-[28deg] rounded-full bg-[#8ec8f0]" />
          <span className="absolute left-10 top-16 h-2.5 w-40 -rotate-[28deg] rounded-full bg-[#7ebfec]" />
          <span className="absolute left-16 top-24 h-2.5 w-28 -rotate-[28deg] rounded-full bg-[#9fd0f4]" />
          <span className="absolute right-4 top-8 h-2.5 w-16 -rotate-[28deg] rounded-full bg-[#b7ddf8]" />
          <span className="absolute left-8 top-4 text-lg text-[#8ec8f0]">+</span>
          <span className="absolute right-10 top-6 h-3 w-3 rounded-full border-2 border-[#8ec8f0]" />
          <span className="absolute bottom-8 left-10 h-2.5 w-2.5 rounded-full border-2 border-[#8ec8f0]" />
          <span className="absolute bottom-10 right-8 text-sm text-[#8ec8f0]">+</span>

          <div className="absolute left-1/2 top-1/2 z-10 flex h-[118px] w-[118px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[7px] border-[#e2c25a] bg-white shadow-sm">
            <Check size={58} strokeWidth={3.2} className="text-[#57b4ea]" aria-hidden="true" />
          </div>
        </div>
      </div>

      <p className="mt-4 max-w-[720px] px-1 text-center text-[0.9rem] font-medium leading-6 text-[#2e9a3a] sm:mt-5 sm:text-[0.98rem]">
        OTP has been verified, PF Advance Claim form submitted successfully on Unified Portal. Please{" "}
        <button type="button" onClick={onViewPdf} className="font-semibold text-[#1565c0] underline">
          CLICK HERE
        </button>{" "}
        to view pdf.
      </p>
    </div>
  );
}
