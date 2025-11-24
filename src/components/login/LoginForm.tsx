"use client";

import PasswordInput from "@/components/login/PasswordInput";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function LoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // 1. Pegar o cookie CSRF (obrigatório com Sanctum SPA)
            await api.get("/sanctum/csrf-cookie");

            // 2. Enviar o login para o Laravel
            const response = await api.post("/login", {
                email: email,
                password: password, // nome correto para o Laravel
            });

            console.log("Login bem sucedido:", response.data);

            // 3. Redirecionar para dashboard
            router.push("/dashboard");

        } catch (err: any) {
            console.error("Erro no login:", err);
            setError("E-mail ou senha inválidos.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full bg-white max-w-md rounded-2xl shadow-xl p-10 flex flex-col items-center">

            <form onSubmit={handleSubmit} className="w-full">
                
                <div className="flex flex-col items-center gap-2 mb-4">
                    <Image
                        src="/logo.jpg"
                        alt="Logo"
                        width={80}
                        height={80}
                        className="rounded-full"
                    />
                    <h2 className="text-xl font-semibold text-gray-800">Bem-vindo</h2>
                    <p className="text-gray-500 text-sm text-center">Faça Login para acessar sua conta</p>
                </div>

                {error && (
                    <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
                )}

                <div className="w-full mb-4">
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@escola.com"
                        required
                    />
                </div>

                <div className="w-full mb-4">
                    <Label>Senha</Label>
                    <PasswordInput
                        value={password}
                        onChange={setPassword}
                        placeholder="Digite sua senha"
                    />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Entrando..." : "Entrar"}
                </Button>
            </form>
        </div>
    );
}
