import { ArrowLeft, Clock, Star, MapPin, ShoppingCart, Plus, Minus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";

// Sample product data
const products = [
  {
    id: 1,
    name: "Maçã Gala",
    price: 4.99,
    unit: "kg",
    image: "/api/placeholder/120/120",
    category: "Frutas",
    description: "Maçãs frescas e doces, ideais para consumo in natura"
  },
  {
    id: 2,
    name: "Banana Prata",
    price: 3.50,
    unit: "kg",
    image: "/api/placeholder/120/120",
    category: "Frutas",
    description: "Bananas maduras e saborosas"
  },
  {
    id: 3,
    name: "Alface Americana",
    price: 2.99,
    unit: "unidade",
    image: "/api/placeholder/120/120",
    category: "Verduras",
    description: "Alface fresca e crocante"
  },
  {
    id: 4,
    name: "Tomate Italiano",
    price: 5.99,
    unit: "kg",
    image: "/api/placeholder/120/120",
    category: "Legumes",
    description: "Tomates maduros e suculentos"
  },
  {
    id: 5,
    name: "Cenoura",
    price: 3.99,
    unit: "kg",
    image: "/api/placeholder/120/120",
    category: "Legumes",
    description: "Cenouras frescas e doces"
  },
  {
    id: 6,
    name: "Laranja Lima",
    price: 4.50,
    unit: "kg",
    image: "/api/placeholder/120/120",
    category: "Frutas",
    description: "Laranjas doces e suculentas"
  }
];

const categories = ["Todos", "Frutas", "Verduras", "Legumes"];

export const LojaDetalhes = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addItem, getItemQuantity, updateQuantity, getTotalItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProducts = selectedCategory === "Todos" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: product.image,
      storeId: parseInt(id || '1'),
      storeName: "Hortifruiti Verde Vida"
    });
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    updateQuantity(productId, quantity);
  };

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

        <div className="ml-auto flex items-center space-x-4">
          {getTotalItems() > 0 && (
            <Button
              variant="ghost"
              onClick={() => navigate('/cart')}
              className="relative text-[#18352a] hover:bg-[#18352a0d]"
            >
              <ShoppingCart className="w-6 h-6" />
              <Badge className="absolute -top-2 -right-2 bg-[#18352a] text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                {getTotalItems()}
              </Badge>
            </Button>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Store Info */}
        <div className="mb-8">
          <div className="flex items-start space-x-6">
            <div className="w-32 h-32 bg-[#d9d9d9] rounded-lg flex-shrink-0"></div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#18352a] mb-2">
                Hortifruiti Verde Vida
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Aberto até 22h</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  <span>4.8 (234 avaliações)</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>2.1 km de distância</span>
                </div>
              </div>
              <p className="text-gray-700">
                Produtos frescos e orgânicos selecionados diariamente. 
                Entrega grátis para pedidos acima de R$ 50,00.
              </p>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#18352a] mb-4">Categorias</h2>
          <div className="flex space-x-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? "bg-[#18352a] text-white hover:bg-[#18352a]/90"
                    : "border-[#18352a] text-[#18352a] hover:bg-[#18352a]/10"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProducts.map((product) => {
            const quantity = getItemQuantity(product.id);
            
            return (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-[#d9d9d9] flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Imagem do produto</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-[#18352a] mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-[#18352a]">
                          R$ {product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          /{product.unit}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {quantity > 0 && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateQuantity(product.id, quantity - 1)}
                              className="w-8 h-8 p-0 border-[#18352a] text-[#18352a] hover:bg-[#18352a]/10"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-semibold text-[#18352a] min-w-[20px] text-center">
                              {quantity}
                            </span>
                          </>
                        )}
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="w-8 h-8 p-0 bg-[#18352a] hover:bg-[#18352a]/90"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Cart Summary */}
        {getTotalItems() > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div>
                <span className="text-lg font-semibold text-[#18352a]">
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'}
                </span>
              </div>
              <Button 
                onClick={() => navigate('/cart')}
                className="bg-[#18352a] hover:bg-[#18352a]/90 text-white px-8 py-3"
              >
                Ver Carrinho
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};