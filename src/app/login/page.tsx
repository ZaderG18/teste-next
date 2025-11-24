import Image from "next/image";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
    return (
        <main className="min-h-screen w-full flex">
                
                {/* lado esquerdo - imagem */}
                <div className="hidden md:block w-1/2 relative">
                    <Image
                        src="/fundo.png"
                        alt="fundo Image"
                        fill
                        className="object-cover brightness-75"
                        />
                </div>

                {/* lado direito - formulário */}
                <div className="w-full md:w-1/2 bg-[#3E235C] flex items-center justify-center px-10">
                    <LoginForm />
                </div>

        </main>
    );
}