"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FormUser() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado único para todos os dados
  const [formData, setFormData] = useState({
    // Passo 1 - Pessoal
    nomeCompleto: "",
    email: "",
    cpf: "",
    telefone: "",
    
    // Passo 2 - Acesso
    tipoAcesso: "aluno", // Valor padrão
    status: "ativo",
    
    // Passo 3 - Institucional (Campos Dinâmicos)
    matricula: "",        // Apenas Aluno
    departamento: "",     // Apenas Funcioários
    dataAdmissao: "",
    observacoes: ""
  });

  // Atualiza inputs de texto
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Atualiza selects do Shadcn
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulação de envio para o Laravel
    console.log("Enviando para API Laravel:", formData);
    
    // Aqui entrará a chamada: await api.post('/usuarios', formData)
    
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <section className="flex w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px]">
      
      {/* LADO ESQUERDO - IMAGEM (Baseado no box-left do seu PHP) */}
      <div className="hidden md:flex w-1/3 bg-[#c57dba] items-center justify-center p-6 relative">
         {/* Overlay roxo para dar o tom da marca */}
         <div className="absolute inset-0 bg-purple-900/20"></div>
         <img
            src="/assets/img/docente/flat-design-children-back-school_52683-44264.jpg"
            alt="Cadastro"
            className="rounded-xl shadow-2xl object-cover w-full h-auto relative z-10"
         />
      </div>

      {/* LADO DIREITO - FORMULÁRIO */}
      <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Barra de Progresso Visual */}
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <span className={`text-sm font-bold ${step >= 1 ? 'text-purple-600' : 'text-gray-300'}`}>1. Pessoal</span>
            <span className={`text-sm font-bold ${step >= 2 ? 'text-purple-600' : 'text-gray-300'}`}>2. Acesso</span>
            <span className={`text-sm font-bold ${step >= 3 ? 'text-purple-600' : 'text-gray-300'}`}>3. Institucional</span>
          </div>

          {/* === PASSO 1: INFORMAÇÕES BÁSICAS === */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-300">
              <div className="flex items-center gap-4">
                 <h2 className="text-2xl font-bold text-gray-800 whitespace-nowrap">Informações Básicas</h2>
                 <div className="h-[2px] w-full bg-purple-200 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2 col-span-2">
                  <Label>Nome Completo</Label>
                  <Input name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} placeholder="Ex: Maria Silva" required />
                </div>

                <div className="space-y-2">
                  <Label>CPF</Label>
                  <Input name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" required />
                </div>

                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input name="telefone" value={formData.telefone} onChange={handleChange} placeholder="(XX) XXXXX-XXXX" required />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label>Email Institucional</Label>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="usuario@escola.com" required />
                  <p className="text-xs text-gray-500">O convite de acesso será enviado para este e-mail.</p>
                </div>
              </div>
            </div>
          )}

          {/* === PASSO 2: INFORMAÇÕES DE ACESSO === */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-300">
              <div className="flex items-center gap-4">
                 <h2 className="text-2xl font-bold text-gray-800 whitespace-nowrap">Dados de Acesso</h2>
                 <div className="h-[2px] w-full bg-purple-200 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Tipo de Acesso</Label>
                  <Select onValueChange={(val) => handleSelectChange("tipoAcesso", val)} defaultValue={formData.tipoAcesso}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aluno">Aluno</SelectItem>
                      <SelectItem value="professor">Professor</SelectItem>
                      <SelectItem value="coordenador">Coordenador</SelectItem>
                      <SelectItem value="responsavel">Responsável</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status Inicial</Label>
                  <Select onValueChange={(val) => handleSelectChange("status", val)} defaultValue={formData.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="suspenso">Suspenso (Bloqueado)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="col-span-2 p-4 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100">
                  <p><strong>Nota de Segurança:</strong> Você não precisa definir uma senha.</p>
                  <p>Ao finalizar, enviaremos um link seguro para o usuário definir a própria senha.</p>
                </div>
              </div>
            </div>
          )}

          {/* === PASSO 3: DADOS INSTITUCIONAIS === */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-300">
              <div className="flex items-center gap-4">
                 <h2 className="text-2xl font-bold text-gray-800 whitespace-nowrap">Dados Institucionais</h2>
                 <div className="h-[2px] w-full bg-purple-200 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* CAMPO CONDICIONAL: MATRÍCULA SÓ PARA ALUNO */}
                {formData.tipoAcesso === 'aluno' && (
                    <div className="space-y-2">
                    <Label>Matrícula (RM)</Label>
                    <Input name="matricula" value={formData.matricula} onChange={handleChange} placeholder="Ex: 2024001" />
                    </div>
                )}

                {/* CAMPO CONDICIONAL: DEPARTAMENTO PARA STAFF */}
                {formData.tipoAcesso !== 'aluno' && formData.tipoAcesso !== 'responsavel' && (
                    <div className="space-y-2">
                    <Label>Departamento / Setor</Label>
                    <Input name="departamento" value={formData.departamento} onChange={handleChange} placeholder="Ex: Ciências Exatas" />
                    </div>
                )}

                <div className="space-y-2">
                  <Label>{formData.tipoAcesso === 'aluno' ? 'Data de Matrícula' : 'Data de Admissão'}</Label>
                  <Input name="dataAdmissao" type="date" value={formData.dataAdmissao} onChange={handleChange} required />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label>Observações</Label>
                  <Textarea 
                    name="observacoes" 
                    value={formData.observacoes} 
                    onChange={handleChange} 
                    placeholder="Informações adicionais sobre o usuário..." 
                    className="resize-none"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {/* BOTÕES DE NAVEGAÇÃO */}
          <div className="flex justify-between pt-6 border-t mt-6">
            <Button 
                type="button" 
                variant="outline" 
                onClick={prev} 
                disabled={step === 1}
                className={`w-32 ${step === 1 ? 'opacity-0' : 'opacity-100'}`}
            >
              Voltar
            </Button>

            {step < 3 ? (
              <Button type="button" onClick={next} className="w-32 bg-purple-600 hover:bg-purple-700">
                Próximo
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading} className="w-40 bg-green-600 hover:bg-green-700">
                {isLoading ? "Salvando..." : "Salvar e Enviar"}
              </Button>
            )}
          </div>

        </form>
      </div>
    </section>
  );
}