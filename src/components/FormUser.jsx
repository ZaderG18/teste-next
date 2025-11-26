"use client";

import { useState } from "react";

export default function FormUser() {
    const [step, setStep] = useState(1);
    
    const next = () setStep(step + 1);
    const prev = () setStep(step - 1);

    return (
        <section className="flex w-full gap-6">
            {/* Imagem */}

            <div className="hidden md:block w-1/3">

            </div>
        </section>
}