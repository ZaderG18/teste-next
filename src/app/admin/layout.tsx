// src/app/(admin)/layout.tsx
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Fixa à Esquerda */}
      <Sidebar />

      {/* Header Fixo no Topo (com margem à esquerda para não cobrir a sidebar) */}
      <Header />

      {/* Conteúdo Principal (com margens para não ficar embaixo do header/sidebar) */}
      <main className="pl-64 pt-16">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}