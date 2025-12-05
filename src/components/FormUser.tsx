"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  User, 
  Lock, 
  Building2, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft 
} from "lucide-react";

export default function FormUser() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Passo 1
    nome: "",
    matricula: "",
    email: "",
    telefone: "",
    // Passo 2
    tipoAcesso: "aluno",
    nivelAcesso: "1",
    // Passo 3
    departamento: "",
    dataAdmissao: "",
    observacoes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Enviando para API:", formData);
    // Simulação de envio
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex min-h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      
      {/* LADO ESQUERDO: Imagem e Branding */}
      <div className="hidden lg:flex w-1/3 bg-purple-600 relative flex-col justify-between p-12 text-white">
        <div className="absolute inset-0 bg-[url('/assets/img/docente/flat-design-children-back-school_52683-44264.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-2">Novo Usuário</h3>
          <p className="text-purple-100">Cadastre alunos e funcionários para acesso à plataforma SAM.</p>
        </div>
        
        {/* Indicador de Passos Vertical */}
        <div className="relative z-10 space-y-6">
          <StepIndicator number={1} title="Dados Pessoais" current={step} icon={<User size={18} />} />
          <StepIndicator number={2} title="Acesso & Perfil" current={step} icon={<Lock size={18} />} />
          <StepIndicator number={3} title="Institucional" current={step} icon={<Building2 size={18} />} />
        </div>

        <div className="relative z-10 text-sm text-purple-200">
          © 2024 SAM System
        </div>
      </div>

      {/* LADO DIREITO: Formulário */}
      <div className="w-full lg:w-2/3 p-8 md:p-16 flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto w-full space-y-8">
          
          {/* Cabeçalho Mobile */}
          <div className="lg:hidden mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Cadastro</h2>
            <p className="text-sm text-gray-500">Passo {step} de 3</p>
            <div className="flex gap-2 justify-center mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-1.5 w-8 rounded-full ${step >= i ? 'bg-purple-600' : 'bg-gray-200'}`} />
              ))}
            </div>
          </div>

          {/* CONTEÚDO DOS PASSOS */}
          <div className="min-h-[320px]">
            
            {/* PASSO 1: Informações Básicas */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-purple-500 pl-4">Informações Básicas</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2 col-span-2">
                    <Label>Nome Completo</Label>
                    <Input name="nome" value={formData.nome} onChange={handleChange} placeholder="Digite o nome completo" className="h-11" required />
                  </div>

                  <div className="space-y-2">
                    <Label>Matrícula / RM</Label>
                    <Input name="matricula" value={formData.matricula} onChange={handleChange} placeholder="000000" className="h-11" />
                  </div>

                  <div className="space-y-2">
                    <Label>Telefone</Label>
                    <Input name="telefone" value={formData.telefone} onChange={handleChange} placeholder="(11) 99999-9999" className="h-11" />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label>Email Institucional</Label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="usuario@escola.com" className="h-11" required />
                  </div>
                </div>
              </div>
            )}

            {/* PASSO 2: Acesso */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-purple-500 pl-4">Configuração de Acesso</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Tipo de Usuário</Label>
                    <Select onValueChange={(v) => handleSelectChange("tipoAcesso", v)} defaultValue={formData.tipoAcesso}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aluno">Aluno</SelectItem>
                        <SelectItem value="professor">Professor</SelectItem>
                        <SelectItem value="coordenador">Coordenador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Nível de Permissão</Label>
                    <Select onValueChange={(v) => handleSelectChange("nivelAcesso", v)} defaultValue={formData.nivelAcesso}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Nível 1 - Leitura</SelectItem>
                        <SelectItem value="2">Nível 2 - Edição Básica</SelectItem>
                        <SelectItem value="3">Nível 3 - Gestão</SelectItem>
                        <SelectItem value="4">Nível 4 - Admin Total</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2 bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 items-start">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                      <Lock size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 text-sm">Segurança Ativa</h4>
                      <p className="text-xs text-blue-600 mt-1">
                        Não é necessário criar uma senha. Um link de acesso seguro será enviado para <strong>{formData.email || "o e-mail cadastrado"}</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PASSO 3: Institucional */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-purple-500 pl-4">Dados Institucionais</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {formData.tipoAcesso !== 'aluno' && (
                    <div className="space-y-2 col-span-2">
                      <Label>Departamento / Setor</Label>
                      <Input name="departamento" value={formData.departamento} onChange={handleChange} placeholder="Ex: Secretaria Acadêmica" className="h-11" />
                    </div>
                  )}

                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <Label>Data de Admissão/Início</Label>
                    <Input name="dataAdmissao" type="date" value={formData.dataAdmissao} onChange={handleChange} className="h-11" />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label>Observações</Label>
                    <Textarea 
                      name="observacoes" 
                      value={formData.observacoes} 
                      onChange={handleChange} 
                      placeholder="Informações adicionais..." 
                      className="resize-none min-h-[100px]" 
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="flex justify-between pt-6 border-t border-gray-100">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={prev} 
              disabled={step === 1}
              className={`text-gray-500 hover:text-gray-800 hover:bg-gray-100 ${step === 1 ? 'invisible' : ''}`}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>

            {step < 3 ? (
              <Button type="button" onClick={next} className="bg-purple-600 hover:bg-purple-700 text-white px-8 h-11 rounded-lg shadow-lg shadow-purple-200 transition-all hover:shadow-purple-300">
                Próximo <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700 text-white px-8 h-11 rounded-lg shadow-lg shadow-green-200 transition-all hover:shadow-green-300">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    Salvando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={18} /> Salvar Cadastro
                  </span>
                )}
              </Button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}

// Pequeno componente auxiliar para o indicador lateral
function StepIndicator({ number, title, current, icon }: any) {
  const isActive = current === number;
  const isCompleted = current > number;

  return (
    <div className={`flex items-center gap-4 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-2' : 'opacity-50'}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${isActive ? 'bg-white text-purple-600 border-white' : 'border-purple-300 text-purple-100'}`}>
        {isCompleted ? <CheckCircle2 size={20} /> : icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider font-semibold text-purple-200">Passo {number}</p>
        <p className="font-medium text-lg">{title}</p>
      </div>
    </div>
  );
}