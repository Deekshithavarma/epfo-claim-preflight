export const DEMO_AUTH_KEY = "claimready-demo-logged-in";

export function isDemoLoggedIn() {
  return window.localStorage.getItem(DEMO_AUTH_KEY) === "1";
}

export function loginDemo() {
  window.localStorage.setItem(DEMO_AUTH_KEY, "1");
}

export function logoutDemo() {
  window.localStorage.removeItem(DEMO_AUTH_KEY);
}
