const express = require("express");
const validarSenha = require("../intermediarios");
const { listarContas, criarConta, alterarConta, deletarConta, saldo,extrato } = require("../controladores/contas");

const contas = express();

contas.post("/contas", criarConta);//criar conta
contas.put("/contas/:numeroConta/usuario", alterarConta);//alterar apenas os dados do usuário
contas.delete("/contas/:numeroConta", deletarConta);//excluir uma conta

contas.get("/contas/saldo", saldo);/*consultar saldo. Ex de como chamar na url:
 http://localhost:3000/contas/saldo?numero_conta=1000&senha=12345
 numero da conta e senha da conta.  */

contas.get("/contas/extrato", extrato);//requisitar como a rota saldo

contas.use(validarSenha);//intermediário chamado apenas pra rota listar

contas.get("/contas", listarContas);// listar todas

module.exports = contas;