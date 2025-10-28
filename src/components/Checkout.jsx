import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const API = import.meta.env.VITE_API_BASE;

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message || "Error al confirmar el pago");
    } else if (paymentIntent) {
      setMessage(`Estado: ${paymentIntent.status}`);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 420,
        margin: "40px auto",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <PaymentElement />
      <button
        disabled={!stripe || loading}
        style={{
          padding: "10px 0",
          borderRadius: "6px",
          backgroundColor: "#0070f3",
          color: "#fff",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Procesando..." : "Pagar"}
      </button>
      {message && <p style={{ marginTop: 12, textAlign: "center" }}>{message}</p>}
    </form>
  );
}

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/payments/create-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: 1000,
            currency: "usd",
            description: "I GUIDE U test",
          }),
        });
        const data = await res.json();
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error("Error al crear el PaymentIntent:", data);
        }
      } catch (err) {
        console.error("Error de conexión con el backend:", err);
      }
    })();
  }, []);

  if (!clientSecret)
    return <p style={{ textAlign: "center" }}>Cargando pago...</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}
