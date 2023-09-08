const express = require("express");
const conta = require("./rotas/contas");
const transacoes = require("./rotas/transacoes");

const app = express();

app.use(express.json());
app.use(transacoes);
app.use(conta);

const porta = 3000;
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
})