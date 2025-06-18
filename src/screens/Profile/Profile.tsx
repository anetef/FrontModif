import { ArrowLeft, User, Mail, Phone, MapPin, Edit, Save, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";

export const Profile = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real app, this would update the user data via API
    setIsEditing(false);
    // Show success message or update context
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      zipCode: ''
    });
    setIsEditing(false);
  };

  const orderHistory = [
    {
      id: '001',
      date: '2024-01-15',
      store: 'Hortifruiti Verde Vida',
      total: 45.90,
      status: 'Entregue'
    },
    {
      id: '002',
      date: '2024-01-10',
      store: 'Hortifruiti Verde Vida',
      total: 32.50,
      status: 'Entregue'
    },
    {
      id: '003',
      date: '2024-01-05',
      store: 'Hortifruiti Verde Vida',
      total: 67.80,
      status: 'Entregue'
    }
  ];

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
        <h1 className="ml-6 text-xl font-semibold text-[#18352a]">Meu Perfil</h1>
        
        <div className="ml-auto">
          <Button
            onClick={logout}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50"
          >
            Sair da Conta
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Info */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-20 h-20 bg-[#18352a] rounded-full flex items-center justify-center mr-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#18352a]">
                    {user?.name}
                  </h2>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
              
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="border-[#18352a] text-[#18352a] hover:bg-[#18352a]/10"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    onClick={handleSave}
                    className="bg-[#18352a] hover:bg-[#18352a]/90"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="border-gray-300"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              )}
            </div>

            <Separator className="mb-6" />

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-[#18352a] mb-4">
                  Informações Pessoais
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome Completo
                    </label>
                    {isEditing ? (
                      <Input
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        className="h-10"
                      />
                    ) : (
                      <div className="flex items-center p-2 bg-gray-50 rounded">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <span>{profileData.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    {isEditing ? (
                      <Input
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="h-10"
                      />
                    ) : (
                      <div className="flex items-center p-2 bg-gray-50 rounded">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        <span>{profileData.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    {isEditing ? (
                      <Input
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        placeholder="(11) 99999-9999"
                        className="h-10"
                      />
                    ) : (
                      <div className="flex items-center p-2 bg-gray-50 rounded">
                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                        <span>{profileData.phone || 'Não informado'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#18352a] mb-4">
                  Endereço
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Endereço
                    </label>
                    {isEditing ? (
                      <Input
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                        placeholder="Rua, número, bairro"
                        className="h-10"
                      />
                    ) : (
                      <div className="flex items-center p-2 bg-gray-50 rounded">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <span>{profileData.address || 'Não informado'}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cidade
                      </label>
                      {isEditing ? (
                        <Input
                          name="city"
                          value={profileData.city}
                          onChange={handleInputChange}
                          placeholder="Cidade"
                          className="h-10"
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded">
                          <span>{profileData.city || 'Não informado'}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CEP
                      </label>
                      {isEditing ? (
                        <Input
                          name="zipCode"
                          value={profileData.zipCode}
                          onChange={handleInputChange}
                          placeholder="00000-000"
                          className="h-10"
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded">
                          <span>{profileData.zipCode || 'Não informado'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order History */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#18352a] mb-4">
              Histórico de Pedidos
            </h3>
            
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div>
                    <div className="font-semibold text-[#18352a]">
                      Pedido #{order.id}
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.store} • {new Date(order.date).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold">
                      R$ {order.total.toFixed(2)}
                    </div>
                    <div className="text-sm text-green-600">
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {orderHistory.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Você ainda não fez nenhum pedido.</p>
                <Button
                  onClick={() => navigate("/")}
                  className="mt-4 bg-[#18352a] hover:bg-[#18352a]/90"
                >
                  Fazer Primeiro Pedido
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};