import { loadStripe } from "@stripe/stripe-js";

const pk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (!pk) {
  console.warn("⚠️ VITE_STRIPE_PUBLISHABLE_KEY no está definido en .env");
}
export const stripePromise = loadStripe(pk || "");
