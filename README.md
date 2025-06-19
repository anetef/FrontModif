# HortiFood Frontend

Bem-vindo ao repositório do frontend do projeto HortiFood! Esta aplicação é construída com React e estilizada com Tailwind CSS, focando em proporcionar uma experiência de usuário intuitiva para o fluxo de compra, desde a autenticação até o gerenciamento do carrinho e finalização do pedido.

## Sumário

* [Visão Geral](#visão-geral)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Como Começar](#como-começar)
    * [Pré-requisitos](#pré-requisitos)
    * [Instalação](#instalação)
    * [Executando o Servidor de Desenvolvimento](#executando-o-servidor-de-desenvolvimento)
    * [Compilando para Produção](#compilando-para-produção)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Scripts Disponíveis](#scripts-disponíveis)
* [Contribuição](#contribuição)

## Visão Geral

Este projeto é a interface do usuário para a plataforma HortiFood, desenvolvida para interagir com um sistema de backend robusto. O foco principal é a jornada do usuário, incluindo:

* **Autenticação**: Registro e login de usuários.
* **Navegação**: Exploração de categorias, lojas e produtos.
* **Carrinho de Compras**: Adição, remoção e atualização de itens.
* **Checkout**: Processo de finalização de pedidos e informações de pagamento.
* **Perfil do Usuário**: Visualização e edição de informações pessoais e histórico de pedidos.

## Tecnologias Utilizadas

* **React**: Uma biblioteca JavaScript para construção de interfaces de usuário.
* **TypeScript**: Um superconjunto de JavaScript que adiciona tipagem estática.
* **Tailwind CSS**: Um framework CSS utilitário para desenvolvimento rápido de UI.
* **Vite**: Uma ferramenta de build rápida para projetos web modernos.
* **React Router DOM**: Para roteamento declarativo em aplicações React.
* **Radix UI**: Utilizado para construir componentes UI acessíveis (ex: `Separator`, `Slot`).
* **Lucide React**: Uma coleção de ícones open-source.
* **Class Variance Authority (cva)**: Para criar variantes de componentes flexíveis e reutilizáveis.
* **Clsx**: Um pequeno utilitário para construir strings de `className` condicionalmente.
* **Tailwind Merge**: Para mesclar classes do Tailwind CSS sem conflitos de estilo.

## Como Começar

Para configurar e executar o projeto em seu ambiente local, siga os passos abaixo:

### Pré-requisitos
Os passos a seguir requerem que o [Node.js](https://nodejs.org/en/) esteja instalado em seu sistema.

### Instalação
1.  Clone este repositório para sua máquina local.
2.  Navegue até o diretório do projeto:
    ```bash
    cd anetef/frontmodif/FrontModif
    ```
3.  Instale as dependências com:
    ```bash
    npm install
    ```

### Executando o Servidor de Desenvolvimento 
Para executar uma versão de desenvolvimento do projeto, utilize o seguinte comando:
```bash
npm run dev
```
Após alguns segundos, seu projeto deverá estar acessível no endereço http://localhost:5173/.

### Compilando para Produção
Se você estiver satisfeito com o resultado, pode finalmente compilar o projeto para lançamento com:

```Bash

npm run build

```
