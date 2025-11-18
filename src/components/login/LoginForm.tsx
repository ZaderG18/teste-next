"use client";
import PasswordInput from "@/components/login/PasswordInput";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";


export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
            <PasswordInput
            value={password}
            onChange={setPassword}
            placeholder="Senha"
            />
        </form>
    );
}