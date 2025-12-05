// src/app/usuarios/criar/page.tsx
import FormUser from "@/components/FormUser"; // Importe do local correto que definimos

export default function CriarUsuarioPage() {
  return (
    <div className="space-y-6">
      {/* Cabeçalho da Página (Contexto) */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-800">Novo Usuário</h1>
        <p className="text-gray-500">
          Preencha os dados abaixo para enviar um convite de acesso à plataforma.
        </p>
      </div>

      {/* O Formulário que criamos */}
      <FormUser />
    </div>
  );
}