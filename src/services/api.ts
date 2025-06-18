// src/services/api.ts

const API_BASE = "http://localhost:3000";

export async function fetchUsers() {
  const response = await fetch(`${API_BASE}/user`);
  if (!response.ok) {
    throw new Error("Erro ao buscar usuários");
  }
  return response.json();
}

export async function createUser(user: { nome: string; email: string; senha: string }) {
  const response = await fetch(`${API_BASE}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar usuário");
  }
  return response.json();
}

export async function login(email: string, senha: string) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      senha,
      type: "user", // 👈 enviado automaticamente, mesmo oculto do Swagger
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao fazer login");
  }

  return response.json();
}
