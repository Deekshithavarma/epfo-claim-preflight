"use client";

import { AppShell } from "@/components/app-shell";
import { SubmitSuccessModal } from "@/components/submit-success-modal";
import { clearFormDraft, loadFormDraft, saveFormDraft } from "@/lib/form-draft";
import { ChevronDown, Pencil } from "lucide-react";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CLAIM_OPTIONS = [
  { value: "", label: "------- Select Claim Option -------" },
  { value: "form-19", label: "PF FINAL SETTLEMENT (FORM-19)" },
  { value: "form-10c", label: "PENSION WITHDRAWAL BENEFIT (FORM-10C)" },
  { value: "form-31", label: "PF ADVANCE (FORM-31)" },
] as const;

const SERVICE_OPTIONS = [
  { value: "", label: "-------- Select Service --------" },
  { value: "MH/PUN/0021987/000/0001234", label: "MH/PUN/0021987/000/0001234" },
  { value: "MH/MUM/0018754/000/0005678", label: "MH/MUM/0018754/000/0005678" },
] as const;

const PURPOSE_OPTIONS = [
  { value: "", label: "-------- Select Purpose --------" },
  { value: "medical_treatment", label: "ESSN - Illness" },
  { value: "education", label: "EDUC - Education" },
  { value: "marriage", label: "MARR - Marriage" },
  { value: "housing", label: "HSNG - Housing" },
] as const;

const ELIGIBLE_AMOUNT = 11113;
const MASKED_MOBILE = "***98XXXX12";
const DEFAULT_ADDRESS = {
  locality: "Sector 14",
  street: "Plot 22, Palm Beach Road",
  state: "Maharashtra",
  district: "Thane",
  city: "Navi Mumbai",
  pin: "400703",
};

const selectClassName =
  "w-full appearance-none rounded-md border border-[#c8d2e0] bg-white px-3 py-2 pr-10 text-[0.98rem] text-[#2d3b4f] shadow-sm outline-none focus:border-[#0e8e8e]";

function FormRow({
  label,
  required,
  last = false,
  children,
}: {
  label: string;
  required?: boolean;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-[minmax(220px,40%)_minmax(0,1fr)] ${last ? "" : "border-b border-slate-200"}`}>
      <div className="border-slate-200 bg-[#fbfcfe] px-5 py-4 text-[1.02rem] font-semibold text-[#2f3a4d] md:border-r">
        {label} {required ? <span className="text-red-600">*</span> : null}
      </div>
      <div className="min-w-0 px-4 py-3">{children}</div>
    </div>
  );
}

function SelectField({
  ariaLabel,
  value,
  onChange,
  options,
  widthClassName = "max-w-[300px]",
}: {
  ariaLabel: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
  widthClassName?: string;
}) {
  return (
    <div className={`relative w-full ${widthClassName}`}>
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={selectClassName}
      >
        {options.map((option) => (
          <option key={option.value || option.label} value={option.value} disabled={option.value === ""}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#5f6d81]" aria-hidden="true" />
    </div>
  );
}

function AddressValue({
  label,
  value,
  editing,
  onChange,
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-[5.75rem_minmax(0,1fr)] items-center gap-x-2 text-[0.95rem] leading-6">
      <span className="whitespace-nowrap font-semibold text-[#2f3a4d]">{label} :</span>
      {editing ? (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-8 w-full min-w-0 rounded-md border border-[#c8d2e0] bg-white px-2 py-1 text-[#2d3b4f] outline-none focus:border-[#0e8e8e]"
        />
      ) : (
        <span className="min-w-0 break-words text-[#2d3b4f]">{value}</span>
      )}
    </div>
  );
}

export function PfAdvanceForm() {
  const router = useRouter();
  const [claimOption, setClaimOption] = useState("");
  const [service, setService] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [editingAddress, setEditingAddress] = useState(false);
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const [consent, setConsent] = useState(true);
  const [otp, setOtp] = useState("");
  const [resendIn, setResendIn] = useState(55);
  const [submitting, setSubmitting] = useState(false);
  const [checkingEligibility, setCheckingEligibility] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedClaimId, setSubmittedClaimId] = useState<string | null>(null);
  const [draftReady, setDraftReady] = useState(false);

  const showForm31Fields = claimOption === "form-31";
  const showSuccessPopup = Boolean(submittedClaimId);

  useEffect(() => {
    const draft = loadFormDraft();
    if (draft) {
      setClaimOption(draft.claimOption);
      setService(draft.service);
      setPurpose(draft.purpose);
      setAmount(draft.amount);
      setAddress(draft.address);
      setConsent(draft.consent);
    }
    setDraftReady(true);
  }, []);

  useEffect(() => {
    if (!draftReady) {
      return;
    }
    saveFormDraft({
      claimOption,
      service,
      purpose,
      amount,
      address,
      consent,
    });
  }, [draftReady, claimOption, service, purpose, amount, address, consent]);

  useEffect(() => {
    if (!showSuccessPopup) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const hideTimer = window.setTimeout(() => {
      setSubmittedClaimId(null);
    }, 4000);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(hideTimer);
    };
  }, [showSuccessPopup]);

  useEffect(() => {
    if (!showForm31Fields) {
      return;
    }
    const timer = window.setInterval(() => {
      setResendIn((current) => (current <= 0 ? 0 : current - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [showForm31Fields]);

  async function onSubmitClaim(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!showForm31Fields) {
      return;
    }

    const parsedAmount = Number(amount);
    if (!purpose || !parsedAmount || parsedAmount <= 0) {
      setError("Enter a valid advance amount to continue.");
      return;
    }
    if (!consent) {
      setError("Please provide Aadhaar authentication consent to continue.");
      return;
    }
    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the 6 digit Aadhaar OTP.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/claim/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "demo-rahul",
          purpose,
          amount: parsedAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to create demo claim");
      }

      const data = (await response.json()) as { claimId: string };
      setSubmittedClaimId(data.claimId);
      resetFormToStart();
    } catch {
      setError("Could not start claim. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetFormToStart() {
    clearFormDraft();
    setClaimOption("");
    setService("");
    setPurpose("");
    setAmount("");
    setEditingAddress(false);
    setAddress(DEFAULT_ADDRESS);
    setConsent(true);
    setOtp("");
    setResendIn(55);
    setError(null);
  }

  async function onCheckEligibility() {
    const missing: string[] = [];
    if (!claimOption) {
      missing.push("I want to apply for");
    }
    if (!service) {
      missing.push("Select eligible service");
    }
    if (!purpose) {
      missing.push("Purpose for which advance is required");
    }
    if (!Number(amount) || Number(amount) <= 0) {
      missing.push("Amount of advance required (in Rs.)");
    }

    if (missing.length > 0) {
      setError(`Please fill ${missing.join(", ")}`);
      return;
    }

    const parsedAmount = Number(amount);
    setCheckingEligibility(true);
    setError(null);

    try {
      const response = await fetch("/api/claim/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "demo-rahul",
          purpose,
          amount: parsedAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to create demo claim");
      }

      const data = (await response.json()) as { claimId: string };
      router.push(`/preflight?claimId=${data.claimId}`);
    } catch {
      setError("Could not start eligibility check. Please try again.");
    } finally {
      setCheckingEligibility(false);
    }
  }

  return (
    <AppShell contentWidth="wide" showTitleCard={false}>
      <form onSubmit={onSubmitClaim} className="mx-auto mt-2 w-full max-w-5xl rounded-2xl bg-white p-3 shadow-[0_12px_30px_rgba(15,37,64,0.14)]">
        <div className="h-10 rounded-t-xl bg-[#0e8e8e]" />

        <section className="rounded-b-xl border border-slate-200 bg-white p-2.5">
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <FormRow label="मैं आवेदन करना चाहता हूँ / I want to apply for" required>
              <SelectField
                ariaLabel="Select Claim Option"
                value={claimOption}
                onChange={(value) => {
                  setClaimOption(value);
                  if (value !== "form-31") {
                    setPurpose("");
                    setAmount("");
                  }
                }}
                options={CLAIM_OPTIONS}
              />
            </FormRow>

            <FormRow label="सदस्य की आधार सत्यापित सेवाएं / Member's Aadhaar Verified Services">
              <p className="py-1 text-[1rem] text-[#2d3b4f]">
                Click{" "}
                <a href="/aadhaar-verified-services" className="font-bold text-[#0f7fbd] underline">
                  here
                </a>{" "}
                to view aadhaar verified services
              </p>
            </FormRow>

            <FormRow label="पात्र सेवा चुनें / Select eligible service" required>
              <SelectField
                ariaLabel="Select eligible service"
                value={service}
                onChange={setService}
                options={SERVICE_OPTIONS}
                widthClassName="max-w-[340px]"
              />
            </FormRow>

            {showForm31Fields ? (
              <>
                <FormRow label="जिस उद्देश्य के लिए अग्रिम की आवश्यकता है / Purpose for which advance is required" required>
                  <SelectField
                    ariaLabel="Purpose for which advance is required"
                    value={purpose}
                    onChange={setPurpose}
                    options={PURPOSE_OPTIONS}
                  />
                </FormRow>

                <FormRow label="आवश्यक अग्रिम की राशि (रु में) / Amount of advance required (in Rs.)" required>
                  <input
                    aria-label="Amount of advance required"
                    type="number"
                    min={1}
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    className="w-full max-w-[140px] rounded-md border border-[#c8d2e0] bg-white px-3 py-2 text-[0.98rem] text-[#2d3b4f] shadow-sm outline-none focus:border-[#0e8e8e]"
                  />
                  <p className="mt-2 text-[0.92rem] italic text-[#1b7a3a]">
                    Eligible Claim Amount: Rs {ELIGIBLE_AMOUNT.toLocaleString("en-IN")}/- (Amount subject to change during
                    processing at EPFO office).
                  </p>
                </FormRow>

                <FormRow label="कर्मचारी का पता / Employee's address" required last>
                  <div className="flex items-start gap-3">
                    <div className="grid min-w-0 flex-1 grid-cols-1 gap-x-8 gap-y-2 lg:grid-cols-2">
                      <AddressValue
                        label="Locality"
                        value={address.locality}
                        editing={editingAddress}
                        onChange={(value) => setAddress((current) => ({ ...current, locality: value }))}
                      />
                      <AddressValue
                        label="Street"
                        value={address.street}
                        editing={editingAddress}
                        onChange={(value) => setAddress((current) => ({ ...current, street: value }))}
                      />
                      <AddressValue
                        label="State"
                        value={address.state}
                        editing={editingAddress}
                        onChange={(value) => setAddress((current) => ({ ...current, state: value }))}
                      />
                      <AddressValue
                        label="District"
                        value={address.district}
                        editing={editingAddress}
                        onChange={(value) => setAddress((current) => ({ ...current, district: value }))}
                      />
                      <AddressValue
                        label="City"
                        value={address.city}
                        editing={editingAddress}
                        onChange={(value) => setAddress((current) => ({ ...current, city: value }))}
                      />
                      <AddressValue
                        label="Pin Code"
                        value={address.pin}
                        editing={editingAddress}
                        onChange={(value) => setAddress((current) => ({ ...current, pin: value }))}
                      />
                    </div>
                    <button
                      type="button"
                      aria-label={editingAddress ? "Done editing address" : "Edit address"}
                      onClick={() => setEditingAddress((current) => !current)}
                      className="mt-0.5 shrink-0 text-[#0f7fbd]"
                    >
                      <Pencil size={16} />
                    </button>
                  </div>
                </FormRow>
              </>
            ) : null}
          </div>

          {showForm31Fields ? (
            <>
              <p className="border-b border-slate-200 px-2 py-4 text-[0.9rem] font-bold italic leading-6 text-[#1d2b3c]">
                *Certified that the particulars are true to the best of my knowledge, I certify that I have gone through the data
                seeded in UAN portal and found all data, including Form No 11 (New), Bank Account details and Aadhaar number to be
                correct. Please make the payment in the bank account mentioned in the UAN Portal. In case the amount is used for any
                purpose other than stated above, I am liable to return the entire amount with penal interest.
              </p>

              <label className="flex items-start gap-3 border-b border-slate-200 px-2 py-4 text-[0.88rem] leading-6 text-[#2d3b4f]">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#1d6fd4]"
                />
                <span>
                  मैं अपनी पहचान स्थापित करने और ऑनलाइन दावा प्रस्तुत करने के उद्देश्य से आधार आधारित प्रमाणीकरण के लिए अपना आधार नंबर,
                  बायोमेट्रिक और/या वन टाइम पिन (ओटीपी) डेटा प्रदान करने के लिए सहमत हूं। / I hereby consent to provide my Aadhaar
                  Number, Biometric and/or One Time Pin (OTP) data for Aadhaar based authentication for the purpose of establishing
                  my identity
                </span>
              </label>

              <div className="flex flex-col items-center gap-3 px-2 py-6 text-center">
                <p className="text-[0.95rem] font-bold text-[#1b7a3a]">
                  SUCCESS: OTP has been sent on Mobile Number {MASKED_MOBILE} (UIDAI)
                </p>
                <button
                  type="button"
                  disabled={resendIn > 0}
                  onClick={() => setResendIn(55)}
                  className="rounded-md bg-[#5aa0e6] px-4 py-2 text-sm font-semibold text-white disabled:opacity-80"
                >
                  {resendIn > 0 ? `Resend OTP in ${resendIn}s` : "Resend OTP"}
                </button>
                <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
                  <span className="text-[0.98rem] font-semibold text-[#2f3a4d]">
                    Enter OTP <span className="text-red-600">*</span>
                  </span>
                  <input
                    aria-label="Enter OTP"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="Enter 6 digit aadhaar OTP"
                    className="w-[240px] rounded-md border border-[#c8d2e0] bg-white px-3 py-2 text-[0.95rem] text-[#2d3b4f] shadow-sm outline-none placeholder:text-[#8a96a8] focus:border-[#1d6fd4]"
                  />
                  <span className="max-w-[280px] text-left text-xs italic text-[#617086]">
                    For Demo purpose enter any 6 digit number to continue
                  </span>
                </div>
                {error ? <p className="mt-3 text-sm font-semibold text-red-700">{error}</p> : null}
                <div className="mt-4 flex w-full max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
                  <button
                    type="button"
                    disabled={submitting || checkingEligibility}
                    onClick={() => void onCheckEligibility()}
                    className="rounded-md bg-[#1e4f9a] px-6 py-2.5 text-[0.98rem] font-semibold text-white shadow-sm hover:bg-[#184282] disabled:opacity-60 sm:min-w-[200px]"
                  >
                    {checkingEligibility ? "Checking..." : "Check Eligibility"}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || checkingEligibility}
                    className="rounded-md bg-[#1e4f9a] px-6 py-2.5 text-[0.98rem] font-semibold text-white shadow-sm hover:bg-[#184282] disabled:opacity-60 sm:min-w-[260px]"
                  >
                    {submitting ? "Validating..." : "Validate OTP and Submit Claim"}
                  </button>
                </div>
              </div>
            </>
          ) : null}

          <div className="mt-1 px-2">
            <p className="text-xs text-[#617086]">Demo mode: synthetic member profile and synthetic claim checks.</p>
          </div>
        </section>
      </form>
      {submittedClaimId ? (
        <SubmitSuccessModal
          onClose={() => setSubmittedClaimId(null)}
          onViewPdf={() => router.push(`/preflight?claimId=${submittedClaimId}`)}
        />
      ) : null}
    </AppShell>
  );
}
