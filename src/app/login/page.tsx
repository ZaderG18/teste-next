import Image from "next/image";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
    return (
        <main className="min-h-screen w-full bg- [#3E235C] flex items-center">
            <div className="flex w-full max-w-6xl mx-auto">
                
                {/* lado esquerdo - imagem */}
                <div className="hidden md:flex w-1/2 bg-gradient-to-b from-[#3E235C] to-[#1A1A1A] items-center justify-center p-10">
                    <Image
                        src="/public/fundo.png"
                        alt="fundo Image"
                        fill
                        className="object-cover"
                        />
                </div>

                {/* lado direito - formulário */}
                <div className="w-full md:w-1/2 px-6 py-12 flex flex-col items-center justify-center">
                    <LoginForm />
                </div>

            </div>
        </main>
    );
}