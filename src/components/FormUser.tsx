"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Para redirecionar após sucesso
import api from "@/lib/api"; // Certifique-se de ter configurado o axios aqui

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
  ChevronLeft,
  AlertCircle
} from "lucide-react";

export default function FormUser() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Passo 1
    nomeCompleto: "",
    matricula: "",
    email: "",
    telefone: "",
    cpf: "",
    // Passo 2
    tipoAcesso: "aluno",
    nivelAcesso: "1",
    status: "ativo",
    // Passo 3
    departamento: "",
    dataAdmissao: "",
    observacoes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Correção do erro de TypeScript: definimos que 'value' é string
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- VALIDAÇÃO (A Lógica Nova) ---
  const validateStep = (currentStep: number) => {
    if (currentStep === 1) {
      if (!formData.nomeCompleto || !formData.email || !formData.cpf || !formData.telefone) {
        alert("Preencha todos os campos obrigatórios (Nome, Email, CPF, Telefone).");
        return false;
      }
    }
    // Adicione mais validações aqui se precisar (ex: Passo 3 condicional)
    if (currentStep === 3) {
       if (formData.tipoAcesso === 'aluno' && !formData.matricula) {
           alert("Para alunos, a Matrícula/RM é obrigatória.");
           return false;
       }
       if (formData.tipoAcesso === 'professor' && !formData.departamento) {
           alert("Para professores, o Departamento é obrigatório.");
           return false;
       }
    }
    return true;
  };

  const next = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 3));
    }
  };

  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação final antes de enviar
    if (!validateStep(3)) return;

    setIsLoading(true);

    try {
        // Mapeamento: Transforma dados do Front para o formato do Back (Laravel)
        const payload = {
            nome: formData.nomeCompleto,      // Laravel espera 'nome'
            email: formData.email,
            cpf: formData.cpf,
            telefone: formData.telefone,
            tipo_acesso: formData.tipoAcesso, // Laravel espera 'tipo_acesso'
            matricula: formData.matricula,
            departamento: formData.departamento,
            // Envia o resto se o controller aceitar
            id_instituicao: 1 // Fallback temporário
        };

        console.log("Enviando Payload:", payload); // Debug no console

        const response = await api.post('/usuarios', payload);

        alert("Sucesso! " + response.data.message);
        router.push("/dashboard"); // Redireciona para a home do painel

    } catch (error: any) {
        console.error("Erro no envio:", error);
        const msg = error.response?.data?.message || "Erro de conexão com o servidor.";
        alert("Erro: " + msg);
    } finally {
        setIsLoading(false);
    }
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
                    <Input name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} placeholder="Digite o nome completo" className="h-11" required />
                  </div>

                  <div className="space-y-2">
                    <Label>CPF</Label>
                    <Input name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" className="h-11" required />
                  </div>

                  <div className="space-y-2">
                    <Label>Telefone</Label>
                    <Input name="telefone" value={formData.telefone} onChange={handleChange} placeholder="(11) 99999-9999" className="h-11" required />
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
                    <Select onValueChange={(v: string) => handleSelectChange("tipoAcesso", v)} defaultValue={formData.tipoAcesso}>
                      <SelectTrigger className="h-11">
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
                    <Select onValueChange={(v: string) => handleSelectChange("status", v)} defaultValue={formData.status}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="suspenso">Suspenso</SelectItem>
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
                  
                  {/* CAMPO CONDICIONAL: MATRÍCULA SÓ PARA ALUNO */}
                  {formData.tipoAcesso === 'aluno' && (
                      <div className="space-y-2">
                        <Label>Matrícula / RM</Label>
                        <Input name="matricula" value={formData.matricula} onChange={handleChange} placeholder="000000" className="h-11" />
                      </div>
                  )}

                  {/* CAMPO CONDICIONAL: DEPARTAMENTO (Esconde p/ Aluno e Resp) */}
                  {formData.tipoAcesso !== 'aluno' && formData.tipoAcesso !== 'responsavel' && (
                    <div className="space-y-2 col-span-2">
                      <Label>Departamento / Setor</Label>
                      <Input name="departamento" value={formData.departamento} onChange={handleChange} placeholder="Ex: Secretaria Acadêmica" className="h-11" />
                    </div>
                  )}

                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <Label>{formData.tipoAcesso === 'aluno' ? 'Data de Matrícula' : 'Data de Admissão'}</Label>
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