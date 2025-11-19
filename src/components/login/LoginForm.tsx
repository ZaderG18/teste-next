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

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Senha:", password);
    }

    return (
        <form 
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
                <Image
                src="/logo.jpg"
                alt="Logo"
                width={90}
                height={90}
                />
                <h2 className="text-xl font semibold text-gray-800">Bem-vindo</h2>
                <p className="text-gray-500 text-sm text-center">Faça Login para acessar sua conta</p>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu Email"
                className="bg-gray-100"
                required
                />
            </div>
            <div className="flex flex-col items-center gap-2">
                <Label htmlFor="password">Senha</Label>
                <PasswordInput
               onChange={setPassword}
                value={password}
                placeholder="Digite sua Senha"
                />
            </div>

            <Button type="submit" className="w-full text-white">
                Entrar
            </Button>
        </form>
    );
}