import { BASE } from "./api";

export async function login({ email, password }) {
  // Stub: simula login exitoso
  return { ok: true, token: "fake-jwt-token", email, password };
}

export async function signup({ name, email, password }) {
  // Stub: simula signup exitoso
  return { ok: true, id: Date.now(), name, email, password };
}
