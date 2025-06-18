import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";

export const Cart = (): JSX.Element => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        {/* Header */}
        <header className="w-full h-[80px] bg-[#f7f7f7] flex items-center px-6 shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center text-[#18352a] hover:bg-[#18352a0d]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Button>
          <h1 className="ml-6 text-xl font-semibold text-[#18352a]">Carrinho</h1>
        </header>

        {/* Empty Cart */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
          <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">
            Seu carrinho está vazio
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Adicione produtos ao seu carrinho para continuar
          </p>
          <Button
            onClick={() => navigate("/")}
            className="bg-[#18352a] hover:bg-[#18352a]/90 text-white px-8 py-3"
          >
            Continuar Comprando
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="w-full h-[80px] bg-[#f7f7f7] flex items-center px-6 shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="flex items-center text-[#18352a] hover:bg-[#18352a0d]"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </Button>
        <h1 className="ml-6 text-xl font-semibold text-[#18352a]">
          Carrinho ({items.length} {items.length === 1 ? 'item' : 'itens'})
        </h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCart}
          className="ml-auto text-red-600 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Limpar Carrinho
        </Button>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-[#d9d9d9] rounded-lg flex-shrink-0 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Produto</span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-[#18352a] mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.storeName}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-[#18352a]">
                          R$ {item.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          /{item.unit}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0 border-[#18352a] text-[#18352a] hover:bg-[#18352a]/10"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        
                        <span className="font-semibold text-[#18352a] min-w-[30px] text-center">
                          {item.quantity}
                        </span>
                        
                        <Button
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0 bg-[#18352a] hover:bg-[#18352a]/90"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:bg-red-50 ml-4"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#18352a]">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="mb-8" />

        {/* Order Summary */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-[#18352a] mb-4">
              Resumo do Pedido
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>R$ {getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Taxa de entrega</span>
                <span className="text-green-600">Grátis</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-xl font-bold text-[#18352a]">
                <span>Total</span>
                <span>R$ {getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Button */}
        <Button
          onClick={handleCheckout}
          className="w-full h-14 bg-[#18352a] hover:bg-[#18352a]/90 text-white font-semibold text-lg"
        >
          Finalizar Pedido
        </Button>
      </div>
    </div>
  );
};