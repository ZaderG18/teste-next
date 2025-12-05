"use client";

import { Bell, Search, ChevronDown } from "lucide-react";
// Se tiver o Avatar do Shadcn, use-o aqui. Se não, use a tag <img> normal.
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; 

export default function Header() {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-40">
      
      {/* BARRA DE PESQUISA */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Buscar..." 
          className="bg-transparent border-none outline-none ml-2 text-sm w-full text-gray-600"
        />
      </div>

      {/* ÁREA DA DIREITA (Notificações e Perfil) */}
      <div className="flex items-center gap-6">
        
        {/* Ícone de Notificação com Bolinha */}
        <button className="relative text-gray-500 hover:text-purple-600 transition-colors">
          <Bell size={24} />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center border-2 border-white">
            3
          </span>
        </button>

        {/* Perfil do Usuário */}
        <div className="flex items-center gap-3 border-l pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-700">Admin SaaS</p>
            <p className="text-xs text-gray-400">Gestor do Sistema</p>
          </div>
          
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar>
              <AvatarImage src="/assets/img/persona/coqui-chang-COP.jpg" alt="Foto Perfil" />
              <AvatarFallback className="bg-purple-100 text-purple-700">AD</AvatarFallback>
            </Avatar>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}