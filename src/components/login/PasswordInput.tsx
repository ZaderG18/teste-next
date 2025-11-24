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
        <div className="relative w-full">
            <Input 
            type={isPasswordVisible ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                 placeholder={placeholder}        
            className="w-full p-2 pr-10 border rounded-md"
            />

            <Button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
                {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </Button>
        </div>
    );
}