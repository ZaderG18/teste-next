"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function PasswordInput({ value, onChange, placeholder }: PasswordInputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (
        <div className="relative">
            <Input 
            type={isPasswordVisible ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                 placeholder={placeholder}        
            className="pr-10"
            />

            <Button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute top-1/2 right-2 -translate-y-1/2 p-0 h-8 w-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </Button>
        </div>
    );
}