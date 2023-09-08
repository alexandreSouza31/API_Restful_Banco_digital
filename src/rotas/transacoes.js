const express = require("express");
const { depositar,sacar,transferir } = require("../controladores/transacoes");

const transacoes = express();

transacoes.post("/transacoes/depositar", depositar);
transacoes.post("/transacoes/sacar",sacar );
transacoes.post("/transacoes/transferir", transferir);

module.exports = transacoes;