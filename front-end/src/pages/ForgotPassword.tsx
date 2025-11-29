import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setIsLoading(true);

    try {
      // Chama nosso backend, que dispara o e-mail via Supabase
      await api.auth.forgotPassword({ email });

      toast({
        title: "Se o e-mail estiver cadastrado...",
        description:
          "Enviamos um link para redefinir sua senha. Confira sua caixa de entrada e o spam.",
      });

      // Opcional: mandar o usuário de volta pro login
      navigate("/login");
    } catch (error: any) {
      console.error(error);

      toast({
        title: "Erro ao enviar e-mail",
        description:
          error?.response?.data?.detail ||
          "Não foi possível processar sua solicitação. Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navbar />
      <main className="pt-20 md:pt-24 flex-1 container mx-auto px-4 py-10 max-w-lg">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Recuperar Senha</CardTitle>
            <CardDescription>
              Informe seu e-mail para receber instruções de recuperação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                variant="gradient"
                className="w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
