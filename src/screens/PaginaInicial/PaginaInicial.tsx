import { SearchIcon, User, LogOut, ShoppingCart } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";

// Data for categories
const categories = Array(7).fill({
  name: "Categoria",
});

// Data for stores
const storeData = {
  name: "Hortifruiti",
  hours: "Horário de funcionamento",
  ratings: "Avaliações",
  distance: "Distância",
};

// Data for filter options
const filterOptions = [
  { name: "Listar", hasArrow: true },
  { name: "Entrega grátis" },
  { name: "Distância" },
  { name: "Pagamento" },
  { name: "Avaliações" },
  { name: "Filtros" },
  { name: "Limpar" },
];

// Data for footer sections
const footerSections = {
  hortifood: {
    title: "HortiFood",
    links: [
      "Quem somos",
      "Fale conosco",
      "Conta e segurança",
      "Entregadores",
      "Cadastre seu hortifruiti",
    ],
  },
  discover: {
    title: "Descubra",
    links: [
      "Descontos em entregas",
      "Combos de produtos",
      "Ofertas da semana",
      "Descontos por volume",
    ],
  },
  social: {
    title: "Social",
    links: [
      { name: "/hortifood", icon: "/vector-1.svg" },
      { name: "@hortifood", icon: "/vector-2.svg" },
      { name: "@hortifood", icon: "/vector.svg" },
    ],
  },
};

// Navigation menu items
const navItems = [
  { name: "Início" },
  { name: "Hortifruits" },
  { name: "Orgânicos" },
  { name: "Frescos" },
  { name: "Prontos" },
  { name: "Bebidas" },
];

export const PaginaInicial = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  const handleStoreClick = (storeId: number) => {
    navigate(`/loja/${storeId}`);
  };

  const handleAuthClick = () => {
    if (user) {
      logout();
    } else {
      navigate('/login');
    }
  };

  const handleUserClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full max-w-[1440px] relative">
        {/* Navigation Bar */}
        <header className="w-full h-[97px] bg-[#f7f7f7] flex items-center px-10">
          <img
            className="w-24 h-[50px]"
            alt="Logohortifood"
            src="/logohortifood-2.png"
          />

          <nav className="flex ml-10 space-x-6">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="font-light text-[#18352a] text-sm cursor-pointer hover:text-[#18352a]/80 transition-colors"
              >
                {item.name}
              </div>
            ))}
          </nav>

          <div className="flex items-center ml-auto space-x-4">
            <div className="relative w-[350px] h-[45px]">
              <Input
                className="h-[45px] pl-10 bg-[#18352a0d] rounded-[7px] text-[#18352a]"
                placeholder="Busque por item ou loja"
              />
              <SearchIcon className="absolute w-5 h-5 top-[13px] left-[9px] text-[#18352a]" />
            </div>

            <div className="flex items-center space-x-4">
              {/* User Info */}
              {user && (
                <div className="flex items-center space-x-2 text-[#18352a]">
                  <span className="text-sm font-medium">Olá, {user.name.split(' ')[0]}</span>
                </div>
              )}

              {/* User Profile Button */}
              <Button
                onClick={handleUserClick}
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-[#18352a] hover:bg-[#18352a0d]"
              >
                <User className="w-5 h-5" />
                <span>{user ? 'Perfil' : 'Entrar'}</span>
              </Button>

              {/* Logout Button (only when logged in) */}
              {user && (
                <Button
                  onClick={handleAuthClick}
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-[#18352a] hover:bg-[#18352a0d]"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sair</span>
                </Button>
              )}

              {/* Shopping Cart */}
              <Button
                onClick={() => navigate('/cart')}
                variant="ghost"
                size="sm"
                className="relative text-[#18352a] hover:bg-[#18352a0d]"
              >
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-[#18352a] text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-40">
          {/* Hero Section */}
          <h1 className="mt-[156px] font-bold text-black text-3xl">
            Pedir no Hortifood é fácil e rápido!
          </h1>

          {/* Welcome Message for Logged Users */}
          {user && (
            <div className="mt-6 p-4 bg-[#d7e3d0] rounded-lg">
              <p className="text-[#18352a] font-medium">
                Bem-vindo de volta, {user.name}! Que tal fazer um novo pedido hoje?
              </p>
            </div>
          )}

          {/* Categories Section */}
          <section className="mt-[73px]">
            <h2 className="font-bold text-black text-2xl mb-10">Categorias</h2>

            <div className="flex space-x-2.5">
              {categories.map((category, index) => (
                <Card
                  key={index}
                  className="w-[120px] h-[120px] bg-[#18352a] rounded-[7px] relative cursor-pointer hover:bg-[#18352a]/90 transition-colors"
                >
                  <CardContent className="p-0">
                    <div className="w-[100px] h-20 mt-2.5 mx-auto bg-[#d9d9d9]" />
                    <div className="absolute bottom-[25px] left-0 right-0 text-center font-light text-white text-sm">
                      {category.name}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Offers Section */}
          <section className="mt-[85px]">
            <h2 className="font-bold text-black text-2xl mb-10">
              Colheita de Ofertas
            </h2>

            <div className="flex space-x-10">
              <Card className="w-[441px] h-[235px] bg-[#d9d9d9d9] rounded-[7px]">
                <CardContent className="p-0"></CardContent>
              </Card>

              <Card className="w-[441px] h-[235px] bg-[#d9d9d9d9] rounded-[7px]">
                <CardContent className="p-0"></CardContent>
              </Card>

              <Card className="w-[178px] h-[235px] bg-[#d9d9d9d9] rounded-[7px] relative">
                <CardContent className="p-0">
                  <div className="absolute w-[60px] h-[60px] top-[88px] right-0 bg-[#0000006b] rounded-[30px] flex items-center justify-center">
                    <img
                      className="w-[21px] h-[26px]"
                      alt="Vector"
                      src="/vector-3.svg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Nearby Stores Section */}
          <section className="mt-[59px]">
            <h2 className="font-bold text-black text-2xl mb-10">
              Hortifruitis perto de você
            </h2>

            <div className="flex space-x-10">
              {[1, 2].map((storeId, index) => (
                <Card
                  key={index}
                  className="w-[411px] h-[132px] bg-[#18352ad9] rounded-[7px] text-white cursor-pointer hover:bg-[#18352a] transition-colors"
                  onClick={() => handleStoreClick(storeId)}
                >
                  <CardContent className="p-5 flex">
                    <div className="w-[115px] h-[89px] bg-[#d9d9d9]" />
                    <div className="ml-5">
                      <h3 className="font-semibold text-xl">
                        {storeData.name}
                      </h3>
                      <p className="mt-2 font-thin text-sm">
                        {storeData.hours}
                      </p>
                      <p className="mt-5 font-thin text-sm">
                        {storeData.ratings}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <p className="font-thin text-sm">{storeData.distance}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Best Ratings Section */}
          <section className="mt-[59px]">
            <h2 className="font-bold text-black text-2xl mb-10">
              As melhores avaliações
            </h2>

            <div className="flex space-x-10">
              {[3, 4].map((storeId, index) => (
                <Card
                  key={index}
                  className="w-[411px] h-[132px] bg-[#18352ad9] rounded-[7px] text-white cursor-pointer hover:bg-[#18352a] transition-colors"
                  onClick={() => handleStoreClick(storeId)}
                >
                  <CardContent className="p-5 flex">
                    <div className="w-[115px] h-[89px] bg-[#d9d9d9]" />
                    <div className="ml-5">
                      <h3 className="font-semibold text-xl">
                        {storeData.name}
                      </h3>
                      <p className="mt-2 font-thin text-sm">
                        {storeData.hours}
                      </p>
                      <p className="mt-5 font-thin text-sm">
                        {storeData.ratings}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <p className="font-thin text-sm">{storeData.distance}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="w-[218px] h-[132px] bg-[#18352ad9] rounded-[7px] text-white relative">
                <CardContent className="p-5 flex">
                  <div className="w-[115px] h-[89px] bg-[#d9d9d9]" />
                  <div className="ml-5">
                    <h3 className="font-semibold text-xl">Hortif</h3>
                    <p className="mt-2 font-thin text-sm">Horário d</p>
                    <p className="mt-5 font-thin text-sm">Avaliaçõe</p>
                  </div>
                  <div className="absolute w-[50px] h-[50px] top-[45px] left-[168px] bg-[#0000006b] rounded-[25px] flex items-center justify-center">
                    <img
                      className="w-[18px] h-[23px]"
                      alt="Vector"
                      src="/vector-3.svg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Hortifruits Section */}
          <section className="mt-[59px]">
            <h2 className="font-bold text-black text-2xl mb-10">Hortifruits</h2>

            {/* Filter Options */}
            <div className="flex space-x-3 mb-10">
              {filterOptions.map((option, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="h-10 px-4 py-2 bg-[url(/rectangle-72.svg)] bg-[100%_100%] font-extralight text-black text-sm rounded-none cursor-pointer hover:bg-[#18352a0d] transition-colors"
                >
                  {option.name}
                  {option.hasArrow && (
                    <img
                      className="ml-1 w-[11px] h-1.5"
                      alt="Vector"
                      src="/vector-4.svg"
                    />
                  )}
                </Badge>
              ))}
            </div>

            {/* Store Grid - 4 rows of 3 stores */}
            <div className="grid grid-cols-3 gap-x-10 gap-y-8">
              {Array(12)
                .fill(null)
                .map((_, index) => (
                  <Card
                    key={index}
                    className="w-[350px] h-[132px] bg-[#18352ad9] rounded-[7px] text-white cursor-pointer hover:bg-[#18352a] transition-colors"
                    onClick={() => handleStoreClick(index + 5)}
                  >
                    <CardContent className="p-5 flex">
                      <div className="w-[115px] h-[89px] bg-[#d9d9d9]" />
                      <div className="ml-5">
                        <h3 className="font-semibold text-xl">
                          {storeData.name}
                        </h3>
                        <p className="mt-2 font-thin text-sm">
                          {storeData.hours}
                        </p>
                        <p className="mt-5 font-thin text-sm">
                          {storeData.ratings}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <p className="font-thin text-sm">
                          {storeData.distance}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* See More Button */}
            <Button className="w-full h-[62px] mt-10 bg-[#d7e3d0] text-[#18352a] font-bold text-xl hover:bg-[#c5d6bb]">
              Ver mais
            </Button>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-20">
          <Separator className="w-full h-0.5" />

          <div className="flex px-[120px] py-10">
            {/* HortiFood Column */}
            <div className="mr-[357px]">
              <h3 className="font-semibold text-[#18352a] text-xl mb-4">
                {footerSections.hortifood.title}
              </h3>
              <ul className="space-y-4">
                {footerSections.hortifood.links.map((link, index) => (
                  <li
                    key={index}
                    className="font-extralight text-[#18352a] text-base cursor-pointer hover:text-[#18352a]/80 transition-colors"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            {/* Discover Column */}
            <div className="mr-[357px]">
              <h3 className="font-semibold text-[#18352a] text-xl mb-4">
                {footerSections.discover.title}
              </h3>
              <ul className="space-y-4">
                {footerSections.discover.links.map((link, index) => (
                  <li
                    key={index}
                    className="font-extralight text-[#18352a] text-base cursor-pointer hover:text-[#18352a]/80 transition-colors"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Column */}
            <div>
              <h3 className="font-semibold text-[#18352a] text-xl mb-4">
                {footerSections.social.title}
              </h3>
              <ul className="space-y-4">
                {footerSections.social.links.map((link, index) => (
                  <li key={index} className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                    <img
                      className="w-[30px] h-[30px]"
                      alt="Social Icon"
                      src={link.icon}
                    />
                    <span className="ml-3 font-extralight text-[#18352a] text-base">
                      {link.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};