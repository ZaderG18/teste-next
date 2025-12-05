"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, Calendar, BarChart3, Users, BookOpen, 
  Megaphone, FileText, MessageSquare, Settings, LogOut 
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  // Função auxiliar para verificar se o link está ativo
  const isActive = (path: string) => pathname === path;
  const activeClass = "text-purple-600 bg-purple-50 border-r-4 border-purple-600";
  const inactiveClass = "text-gray-600 hover:text-purple-600 hover:bg-purple-50";

  return (
    <aside className="w-64 bg-white h-screen shadow-lg fixed left-0 top-0 z-50 flex flex-col hidden md:flex">
      {/* LOGO */}
      <div className="h-16 flex items-center px-6 border-b">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-gray-800">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white">
            S
          </div>
          <span>SAM</span>
        </Link>
      </div>

      {/* MENU DE NAVEGAÇÃO */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
        
        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Principais
        </div>
        
        <Link href="/dashboard" className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${isActive('/dashboard') ? activeClass : inactiveClass}`}>
          <Home size={20} />
          <span>Home</span>
        </Link>

        <Link href="/calendario" className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${isActive('/calendario') ? activeClass : inactiveClass}`}>
          <Calendar size={20} />
          <span>Calendário</span>
        </Link>

        <Link href="/relatorios" className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${isActive('/relatorios') ? activeClass : inactiveClass}`}>
          <BarChart3 size={20} />
          <span>Dashboard</span>
        </Link>

        <div className="px-4 py-2 mt-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Gerenciamento
        </div>

        <Link href="/usuarios/criar" className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${isActive('/usuarios/criar') ? activeClass : inactiveClass}`}>
          <Users size={20} />
          <span>Gerenciar Usuários</span>
        </Link>

        <Link href="/cursos" className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${isActive('/cursos') ? activeClass : inactiveClass}`}>
          <BookOpen size={20} />
          <span>Gerenciar Cursos</span>
        </Link>

        <div className="px-4 py-2 mt-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Comunicação
        </div>

        <Link href="/comunicados" className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${isActive('/comunicados') ? activeClass : inactiveClass}`}>
          <Megaphone size={20} />
          <span>Comunicados</span>
        </Link>

        <Link href="/documentos" className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${isActive('/documentos') ? activeClass : inactiveClass}`}>
          <FileText size={20} />
          <span>Documentos</span>
        </Link>

        <div className="px-4 py-2 mt-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Outros
        </div>

        <Link href="/chat" className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${isActive('/chat') ? activeClass : inactiveClass}`}>
          <MessageSquare size={20} />
          <span>Chat</span>
        </Link>

        <Link href="/configuracoes" className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${isActive('/configuracoes') ? activeClass : inactiveClass}`}>
          <Settings size={20} />
          <span>Configurações</span>
        </Link>

      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t">
        <button className="flex items-center gap-3 w-full px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}