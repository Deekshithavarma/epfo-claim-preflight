const FORM_DRAFT_KEY = "claimready-form-draft";

export interface FormDraft {
  claimOption: string;
  service: string;
  purpose: string;
  amount: string;
  address: {
    locality: string;
    street: string;
    state: string;
    district: string;
    city: string;
    pin: string;
  };
  consent: boolean;
}

export function saveFormDraft(draft: FormDraft) {
  window.sessionStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(draft));
}

export function loadFormDraft(): FormDraft | null {
  try {
    const raw = window.sessionStorage.getItem(FORM_DRAFT_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as FormDraft;
  } catch {
    return null;
  }
}
