"use client";
import PasswordInput from "@/components/login/PasswordInput";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";


export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setError(data.message || "Erro ao fazer login");
                return;
        }

        localStorage.setItem("token", data.token);
        
        alert("Login realizado com sucesso");
    } catch (error){
        setError("Erro ao fazer login");
    } finally {
        setLoading(false);
    }
}
    

    return (
        <div className="w-full bg-white max-w-md rounded-2xl shadow-xl p-10 flex flex-col items-center">
       
         <form 
            onSubmit={handleSubmit} className="w-full"
            >
            <div className="flex flex-col items-center gap-2">
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

            {errorMessage &&(
                <p className="text-red-500 text-sm mb-3">{errorMessage}</p>
            )}

            <div className="w-full mb-4">
                <Label htmlFor="email" className="text-sm text-gray-700">Email</Label>
                <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu Email"
                className="mt-1"
                required
                />
            </div>

            <div className="w-full mb-2">
                <Label htmlFor="password" className="text-sm text-gray-700">Senha</Label>
                <PasswordInput
               onChange={setPassword}
                value={password}
                placeholder="Digite sua Senha"
                />
            </div>

            <Button 
            type="submit" 
            className="w-full h-11 mt-6 bg-black text-white hover:bg-gray-800"
            disabled={loading}
            >
                {loading ? "Carregando..." : "Entrar"}
            </Button>
        </form>
        </div>
    );
}