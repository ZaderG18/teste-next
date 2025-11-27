"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormUser() {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        dataNascimento: "",
        genero: "",
        tipoAcesso: "Aluno",
        // Campos Especificos por acessos
        matricula: "", // aluno
        cargo: "", // funcionarios gerais
        registroFuncional: "", // professores
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const next = () => setStep(step + 1);
    const prev = () => setStep(step - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Dados prontos para envio", formData);
    };


    return (
        <section className="flex w-full gap-6 p-6 bg-white rouded-xl shadow-sm">
            {/* Imagem */}

            <div className="hidden md:block w-1/3">
            <img src="/flat-design-children-back-school_52683-44264.jpg" 
            alt=""
            className="rounded-lg shadow h-full object-cover"/>
            </div>

            {/* form */}
            <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div className="text-sm font-semibold text-purple-700 mb-4">
                    Passo {step} de 3
                </div>

                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                        <h2 className="text-xl font-bold text-gray-800">Quem é o usuário?</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Nome</Label>
                                <Input
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    placeholder="Nome completo"
                                    required
                                />
                            </div>

                                <div>
                                <Label>CPF</Label>
                                <Input
                                    name="cpf"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    placeholder="000.000.000-00"
                                    required
                                />
                                </div>

                                <div>
                                <Label>Email (Login)</Label>
                                <Input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="email@escola.com"
                                    required
                                />
                            </div>

                            
                                <div>
                                <Label>Telefone</Label>
                                <Input
                                    name="telefone"
                                    value={formData.telefone}
                                    onChange={handleChange}
                                    placeholder="(11) 99999-9999"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="button" onClick={next} className="bg-purple-600">
                                Próximo
                            </Button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                        <h2 className="text-xl font-bold text-gray-800">Qual o papel na escola?</h2>

                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <Label>Tipo de Acesso</Label>
                                <select
                                    name="tipoAcesso"
                                    value={formData.tipoAcesso}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md">
                                        <option value="Aluno">Aluno</option>
                                        <option value="Professor">Professor</option>
                                        <option value="Coordenador">Coordenador</option>
                                        <option value="Diretor">Diretor</option>
                                    </select>
                        </div>
                        {/* CAMPOS DINÂMICOS - SÓ APARECEM SE FOR ALUNO */}
                        {formData.tipoAcesso === "Aluno" && (
                            <div className="p-4 bg-purple-50 rounded-md space-y-3 border border-purple-100">
                                
                                <Label>Matrícula</Label>
                                <Input
                                    name="matricula"
                                    value={formData.matricula}
                                    onChange={handleChange}
                                    placeholder="Matrícula"
                                    required
                                />
                            </div>
                        )}

                        {/* CAMPOS DINÂMICOS - SÓ APARECEM SE FOR PROFESSOR */}


}

            </form>
        </section>
}