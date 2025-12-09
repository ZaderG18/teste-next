import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// --- INTERCEPTOR DE SEGURANÇA ---
// Antes de cada requisição, ele verifica se tem token e anexa
api.interceptors.request.use((config) => {
  // O nome 'sam_token' deve ser IGUAL ao que você usou no Login
  const token = typeof window !== 'undefined' ? localStorage.getItem("sam_token") : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;