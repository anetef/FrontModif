import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PaginaInicial } from "./screens/PaginaInicial";
import { LojaDetalhes } from "./screens/LojaDetalhes";
import { Login } from "./screens/Login";
import { Cart } from "./screens/Cart";
import { Checkout } from "./screens/Checkout";
import { Profile } from "./screens/Profile";

export const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PaginaInicial />} />
          <Route 
            path="/loja/:id" 
            element={
              <ProtectedRoute>
                <LojaDetalhes />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
};