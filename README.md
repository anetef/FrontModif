# HortiFood Frontend

Bem-vindo ao repositório do frontend do projeto HortiFood! Esta aplicação é construída com React e estilizada com Tailwind CSS, focando em proporcionar uma experiência de usuário intuitiva para o fluxo de compra, desde a autenticação até o gerenciamento do carrinho e finalização do pedido.

## Mudança principal do projeto anterior
 ### Rota: src/contexts/AuthContext.tsx
Implementamos uma API no back-end para gerenciar a conexão, a autenticação e o armazenamento de usuários cadastrados. Isso significa que, agora, os dados dos usuários não estão mais armazenados diretamente no código do front-end, mas sim em um banco de dados no back-end.

### Implementação anterior 

![web-ex](https://github.com/user-attachments/assets/90487759-ca17-4053-9be2-ccba43285057)

```
Link do repositori do projeto back anterior
```
https://github.com/anetef/ProjetoWebFrontEnd.git

### Nova implementação chamada da API que se conecta ao Back-end


![image](https://github.com/user-attachments/assets/ff939df1-2400-47ba-8d0a-2f59d8da4723)


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
