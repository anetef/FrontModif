import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, createUser as apiRegisterUser } from '../services/api'; // Importa as funções da API

interface User { //define a estrutura de um usuario no front
  id: number; 
  name: string;
  email: string;
}

interface AuthContextType { // define o formato de contexto de autenticação disponibel para os componentes
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('hortifood_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      //Tiramos os usuarios de teste Mockados 
      // Chama a função de login da API 
      const response = await apiLogin(email, password);
      if (response && response.user && response.user.id && response.user.nome && response.user.email) {
        const userData: User = { 
            id: response.user.id, 
            name: response.user.nome,
            email: response.user.email 
        };
        setUser(userData);
        localStorage.setItem('hortifood_user', JSON.stringify(userData));
        return true;
      } else {
        console.error("Login API response malformed or missing 'nome' property:", response);
        return false;
      }
    } catch (error: any) {
      console.error("Erro no login:", error.message || error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Chama a função de criação de usuário da API
      const newUser = await apiRegisterUser({ nome: name, email, senha: password });
      if (newUser && newUser.id && newUser.nome && newUser.email) { 
          const userData: User = { 
            id: newUser.id, 
            name: newUser.nome,
            email: newUser.email 
          };

          setUser(userData);
          localStorage.setItem('hortifood_user', JSON.stringify(userData));
          return true;
      } else {
          console.error("Register API response malformed or missing 'nome' property:", newUser);
          return false;
      }
    } catch (error: any) {
      console.error("Erro no registro:", error.message || error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hortifood_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};