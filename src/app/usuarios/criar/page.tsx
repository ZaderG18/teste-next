"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import FormUser from "@/components/FormUser";

export default function CriarUsuarioPage() {
    return(
        <div className="flex">
            <Sidebar />
            <div className="w-full">
                <Header />

                <main className="p-6">
                    <FormUser />
                </main>
            </div>
        </div>
    )
}