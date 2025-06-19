import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, createUser as apiRegisterUser } from '../services/api'; // Importar as funções da API

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
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
      // Chamar a função de login da API real
      const response = await apiLogin(email, password);
      if (response && response.user && response.user.id && response.user.name && response.user.email) {
        const userData: User = { 
            id: response.user.id, 
            name: response.user.name, 
            email: response.user.email 
        };
        setUser(userData);
        localStorage.setItem('hortifood_user', JSON.stringify(userData));
        return true;
      } else {
        console.error("Login API response malformed:", response);
        return false;
      }
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {                                                                               // Chamar a função de criação de usuário da API real
      const newUser = await apiRegisterUser({ nome: name, email, senha: password });  // Após o registro, você pode optar por logar o usuário automaticamente
      if (newUser && newUser.id && newUser.name && newUser.email) {
          const userData: User = { 
            id: newUser.id, 
            name: newUser.name, 
            email: newUser.email 
          };
          setUser(userData);
          localStorage.setItem('hortifood_user', JSON.stringify(userData));
          return true;
      } else {
          console.error("Register API response malformed:", newUser);
          return false;
      }
    } catch (error) {
      console.error("Erro no registro:", error);
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