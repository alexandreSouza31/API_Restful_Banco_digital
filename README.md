# Restful API de banco digital

Trata-se de uma Restful API de um banco digital que permite que os usuários realizem operações bancárias como criar contas, consultar saldos, visualizar extratos, realizar depósitos, saques e transferências.

## Sumário

- [Visão geral](#visão-geral)
  - [Prints](#prints)
- [O processo](#o-processo)
  - [Desenvolvido com](#desenvolvido-com)
  - [Recursos utilizados](#recursos-utilizados)
  - [Pré-Requisitos](#pré-requisitos)
- [Como rodar o código?](#como-rodar-o-código)
  - [passo 1 - Clone ou baixe o projeto](#passo-1---Clone-ou-baixe-o-projeto)
  - [passo 2 - Instalando dependências](#passo-2---Instalando-dependências)
  - [passo 3 - Iniciando o projeto](#passo-3---Iniciando-o-projeto)
- [Uso](#Uso)
- [Contribuição](#Contribuição)
- [Autor](#autor)

## Visão geral

### Prints

![criar-conta](https://github.com/alexandreSouza31/computador_de_bordo-Carro/assets/112407769/d068dc28-7451-4794-87ed-228355e2802a)

![listar-todas](https://github.com/alexandreSouza31/computador_de_bordo-Carro/assets/112407769/fbcaca02-760d-4a1e-a160-bc7912747e82)

![extrato1](https://github.com/alexandreSouza31/computador_de_bordo-Carro/assets/112407769/869df930-629a-41d0-a76b-c76c9d39fda8)

![extrato2](https://github.com/alexandreSouza31/computador_de_bordo-Carro/assets/112407769/55042230-0f93-41bf-9fb3-d469ae037e8c)

## O processo

### Desenvolvido com

- Javascript
- lógica de programação
- Node.JS

### Recursos utilizados

- [Express](https://expressjs.com/pt-br/) - Framework Node mais popular e a biblioteca subjacente para uma série de outros frameworks do Node.

- [Node.js](https://nodejs.org/pt-br/about) - Ambiente de execução do código JavaScript do lado servidor (server side)

- [Nodemon](https://nodemon.io/) - Monitora as mudanças nos arquivos do seu projeto e reinicia automaticamente o servidor Node. js quando necessário.

## Pré-Requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) - Um ambiente de tempo de execução JavaScript que você pode usar para executar o servidor backend.


### Como rodar o código?? 


#### passo 1 - Clone ou baixe o projeto

1. Abra o terminal do seu editor de código;
2. Navegue até a pasta onde deseja instalar o projeto;
3. Clone o projeto ```ex: git clone https://github.com/seu-usuario/seu-projeto-backend.git```, ou se preferir,baixe clicando no cotão verde chamado "Code" no repositório desse projeto, e depois "Download zip.

#### passo 2 - Instalando dependências

1. npm - Digite o seguinte comando no terminal `npm install`;
2. express - Digite o seguinte comando no terminal `npm install express`;
2. nodemon - Digite o seguinte comando no terminal `npm install -D nodemon`;

<!-- alterar alterar alterar alterar alterar alterar alterar alterar alterar alterar alterar alterar alterar alterar alterar -->

#### passo 3 - Iniciando o projeto
1. Inicie o servidor digitando `npm run dev` no terminal;
2.  O servidor estará em execução em http://localhost:3000;
3. Use o Insomnia, Postman ou alguma extensão no seu programa de ambiente de desenvolvimento como o Thunder client do VS Code, por exemplo;
4. Para testar os endpoints escreva as rotas com os parâmetros, a depender, de cada requisição;

## Uso
A seguir, estão algumas das principais funcionalidades e endpoints da API:

- **POST /contas/criar:** Crie uma nova conta bancária.
- **PUT /contas/:numeroConta/alterar:** Altere os detalhes de uma conta bancária existente.
- **DELETE /contas/:numeroConta/deletar:** Exclua uma conta bancária (somente se o saldo for zero).
- **GET /contas/listar:** Liste todas as contas bancárias cadastradas. (Será necessário colocar a senha do banco no parâmetro da rota)
- **GET /contas/saldo?numero_conta=:numeroConta&senha=:senha:** Consulte o saldo de uma conta.
- **GET /contas/extrato?numero_conta=:numeroConta&senha=:senha:** Visualize o extrato de uma conta.


### Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) e enviar pull requests para melhorar este projeto.

:)

## Autor

- LinkdIn - Alexandre Mariano(https://www.linkedin.com/in/alexandresouza31/)
