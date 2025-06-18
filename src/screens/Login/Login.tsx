import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { createUser } from "../../services/api";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLoginMode) {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/');
      } else {
        setError('Email ou senha incorretos');
      }
    } else {
      if (!formData.name.trim()) {
        setError('Nome é obrigatório');
        return;
      }

      try {
        setIsRegistering(true);
        await createUser({
          nome: formData.name,
          email: formData.email,
          senha: formData.password,
        });
        navigate('/');
      } catch (err: any) {
        setError(err.message || 'Erro ao criar conta');
      } finally {
        setIsRegistering(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError('');
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f7f7] to-[#e8f5e8] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            className="w-32 h-16 mx-auto mb-4"
            alt="HortiFood Logo"
            src="/logohortifood-2.png"
          />
          <h1 className="text-2xl font-bold text-[#18352a]">
            {isLoginMode ? 'Bem-vindo de volta!' : 'Crie sua conta'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isLoginMode
              ? 'Entre para continuar suas compras'
              : 'Cadastre-se para começar a comprar'
            }
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLoginMode && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Nome completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 h-12 border-gray-300 focus:border-[#18352a] focus:ring-[#18352a]"
                    required={!isLoginMode}
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 h-12 border-gray-300 focus:border-[#18352a] focus:ring-[#18352a]"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Senha"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-[#18352a] focus:ring-[#18352a]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading || isRegistering}
                className="w-full h-12 bg-[#18352a] hover:bg-[#18352a]/90 text-white font-semibold text-lg"
              >
                {(isLoading || isRegistering) ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {isLoginMode ? 'Entrando...' : 'Criando conta...'}
                  </div>
                ) : (
                  isLoginMode ? 'Entrar' : 'Criar conta'
                )}
              </Button>
            </form>

            {isLoginMode && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800 font-medium mb-2">Contas de demonstração:</p>
                <div className="text-xs text-blue-700 space-y-1">
                  <p><strong>Email:</strong> joao@email.com | <strong>Senha:</strong> 123456</p>
                  <p><strong>Email:</strong> maria@email.com | <strong>Senha:</strong> 123456</p>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLoginMode ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              </p>
              <button
                type="button"
                onClick={toggleMode}
                className="text-[#18352a] font-semibold hover:underline mt-1"
              >
                {isLoginMode ? 'Cadastre-se aqui' : 'Entre aqui'}
              </button>
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/"
                className="text-gray-500 text-sm hover:text-gray-700 hover:underline"
              >
                Continuar sem fazer login
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Ao continuar, você concorda com nossos</p>
          <div className="space-x-4 mt-1">
            <a href="#" className="hover:text-[#18352a] hover:underline">Termos de Uso</a>
            <span>•</span>
            <a href="#" className="hover:text-[#18352a] hover:underline">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </div>
  );
};
