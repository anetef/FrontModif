import { ArrowLeft, CreditCard, MapPin, Clock, CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";

export const Checkout = (): JSX.Element => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();

    // Redirect to success page after 2 seconds
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-[#18352a] mb-4">
            Pedido Confirmado!
          </h1>
          <p className="text-gray-600 mb-6">
            Seu pedido foi processado com sucesso. Você receberá uma confirmação por email.
          </p>
          <p className="text-sm text-gray-500">
            Redirecionando para a página inicial...
          </p>
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
          onClick={() => navigate("/cart")}
          className="flex items-center text-[#18352a] hover:bg-[#18352a0d]"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </Button>
        <h1 className="ml-6 text-xl font-semibold text-[#18352a]">Finalizar Pedido</h1>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="w-5 h-5 text-[#18352a] mr-2" />
                  <h3 className="text-lg font-semibold text-[#18352a]">
                    Endereço de Entrega
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <Input
                    name="address"
                    placeholder="Endereço completo"
                    value={paymentData.address}
                    onChange={handleInputChange}
                    className="h-12"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="city"
                      placeholder="Cidade"
                      value={paymentData.city}
                      onChange={handleInputChange}
                      className="h-12"
                      required
                    />
                    <Input
                      name="zipCode"
                      placeholder="CEP"
                      value={paymentData.zipCode}
                      onChange={handleInputChange}
                      className="h-12"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-5 h-5 text-[#18352a] mr-2" />
                  <h3 className="text-lg font-semibold text-[#18352a]">
                    Forma de Pagamento
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex space-x-4 mb-4">
                    <Button
                      type="button"
                      variant={paymentData.paymentMethod === 'credit' ? 'default' : 'outline'}
                      onClick={() => setPaymentData(prev => ({ ...prev, paymentMethod: 'credit' }))}
                      className={paymentData.paymentMethod === 'credit' 
                        ? 'bg-[#18352a] text-white' 
                        : 'border-[#18352a] text-[#18352a]'
                      }
                    >
                      Cartão de Crédito
                    </Button>
                    <Button
                      type="button"
                      variant={paymentData.paymentMethod === 'debit' ? 'default' : 'outline'}
                      onClick={() => setPaymentData(prev => ({ ...prev, paymentMethod: 'debit' }))}
                      className={paymentData.paymentMethod === 'debit' 
                        ? 'bg-[#18352a] text-white' 
                        : 'border-[#18352a] text-[#18352a]'
                      }
                    >
                      Cartão de Débito
                    </Button>
                  </div>

                  <Input
                    name="cardNumber"
                    placeholder="Número do cartão"
                    value={paymentData.cardNumber}
                    onChange={handleInputChange}
                    className="h-12"
                    maxLength={19}
                    required
                  />
                  
                  <Input
                    name="cardName"
                    placeholder="Nome no cartão"
                    value={paymentData.cardName}
                    onChange={handleInputChange}
                    className="h-12"
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="expiryDate"
                      placeholder="MM/AA"
                      value={paymentData.expiryDate}
                      onChange={handleInputChange}
                      className="h-12"
                      maxLength={5}
                      required
                    />
                    <Input
                      name="cvv"
                      placeholder="CVV"
                      value={paymentData.cvv}
                      onChange={handleInputChange}
                      className="h-12"
                      maxLength={4}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full h-14 bg-[#18352a] hover:bg-[#18352a]/90 text-white font-semibold text-lg mt-6"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processando Pagamento...
                      </div>
                    ) : (
                      `Pagar R$ ${getTotalPrice().toFixed(2)}`
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Delivery Time */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 text-[#18352a] mr-2" />
                  <h3 className="text-lg font-semibold text-[#18352a]">
                    Tempo de Entrega
                  </h3>
                </div>
                <p className="text-gray-600">
                  Estimativa: 30-45 minutos
                </p>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#18352a] mb-4">
                  Itens do Pedido
                </h3>
                
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          x{item.quantity}
                        </span>
                      </div>
                      <span className="font-semibold">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="mb-4" />

                <div className="space-y-2">
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

            {/* Customer Info */}
            {user && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#18352a] mb-4">
                    Dados do Cliente
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p><strong>Nome:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};