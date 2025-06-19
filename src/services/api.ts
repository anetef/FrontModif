// Define a URL base do seu backend. Importante para que o frontend saiba onde enviar as requisições.
const API_BASE = "http://localhost:3000";

export async function fetchUsers() {
  const response = await fetch(`${API_BASE}/user`,{
    credentials: 'include' 
  });
  
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
  const response = await fetch(`${API_BASE}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      senha,
    }),
    credentials: 'include' 
  });

  if (!response.ok) {
    throw new Error("Erro ao fazer login");
  }

  return response.json();
}
