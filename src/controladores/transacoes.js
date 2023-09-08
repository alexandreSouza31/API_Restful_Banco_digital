const bancodedados = require("../dados/bancodedados");//pego o array do banco
const criarDataFormatada = require("../funcoesAuxiliares/criarDataFormatada");
const verificaCampoString = require("../funcoesAuxiliares/verificaCampoString");
const verificarCampoVazio = require("../funcoesAuxiliares/verificarCampoVazio");

const realizarTransacao = (req, res, operacao) => {
    const { numero_conta, valor, senha, numero_conta_origem, numero_conta_destino } = req.body;

    //campos obrigatórios a serem preenchidos. se depositar não precisa de senha, senão, precisa.
    let camposObrigatorios;
    let resultadoVerificacaoVazios;
    let campoString;
    let resultadoVerificacaoStrings;

    if (operacao === "depositar") {
        camposObrigatorios = ["numero_conta", "valor"];
        resultadoVerificacaoVazios = verificarCampoVazio(camposObrigatorios, numero_conta, valor);
        campoString = ["numero_conta"];
        resultadoVerificacaoStrings = verificaCampoString( ["numero_conta"],[numero_conta]);

    } else if (operacao === "sacar") {
        camposObrigatorios = ["numero_conta", "valor", "senha"];
        resultadoVerificacaoVazios = verificarCampoVazio(camposObrigatorios, numero_conta, valor, senha);
        campoString = ["numero da conta", "senha"];
        resultadoVerificacaoStrings = verificaCampoString(["numero_conta", "senha"],[numero_conta, senha]);

    } else if (operacao === "transferir") {
        camposObrigatorios = ["numero_conta_origem", "numero_conta_destino", "valor", "senha"];
        resultadoVerificacaoVazios = verificarCampoVazio(camposObrigatorios, numero_conta_origem, numero_conta_destino, valor, senha);
        campoString = ["numero_conta_origem", "numero_conta_destino", "senha"];//conta deve ser passada como string assim como a senha
        resultadoVerificacaoStrings = verificaCampoString(
             ["numero_conta_origem", "numero_conta_destino", "senha"],[numero_conta_origem, numero_conta_destino, senha]);
    }

    if (resultadoVerificacaoVazios.erro) {
        return res.status(400).json({ mensagem: resultadoVerificacaoVazios.mensagem });
    }

    if (resultadoVerificacaoStrings.erro) {
        return res.status(400).json({ mensagem: resultadoVerificacaoStrings.mensagem });
    }

    //conta existe?    

    const contaExistente = bancodedados.contas.find(conta => {
        return conta.numero === numero_conta;
    });

    const contaOrigemExistente = bancodedados.contas.find(conta => {
        return conta.numero === numero_conta_origem;
    });

    const contaDestinoExistente = bancodedados.contas.find(conta => {
        return conta.numero === numero_conta_destino;
    });


    if (operacao === "sacar" && !contaExistente || operacao === "depositar" && !contaExistente) {
        return res.status(404).json({ mensagem: "A conta informada não existe!" });

    } else if (operacao === "transferir" && !contaOrigemExistente) {
        return res.status(404).json({ mensagem: "A conta de origem informada não existe!" });

    } else if (operacao === "transferir" && !contaDestinoExistente) {
        return res.status(404).json({ mensagem: "A conta de destino informada não existe!" });

    } else if (operacao === "transferir" && contaOrigemExistente === contaDestinoExistente) {
        return res.status(404).json({ mensagem: "As contas são iguais!" });
    }


    // senha correta para sacar ou transferir
    if (operacao === "sacar" && senha !== contaExistente.usuario.senha) {
        return res.status(403).json({ mensagem: "Senha incorreta!" });
    }
    if (operacao === "transferir" && senha !== contaOrigemExistente.usuario.senha) {
        return res.status(403).json({ mensagem: "Senha incorreta. Transferência falhou!" });
    }

    const valorNumericoValido = typeof valor !== "number" || valor <= 0;

    //valor passado deve ser numérico
    if (operacao === "depositar" && valorNumericoValido || operacao === "sacar" && valorNumericoValido || operacao === "transferir" && valorNumericoValido ) {
        return res.status(400).json({ mensagem: "Digite um valor válido!" });
    }

    if (operacao === "sacar" && contaExistente.saldo < valor) {
        return res.status(400).json({ mensagem: "Saldo insuficiente para realizar o saque!" });
    }

    if (operacao === "transferir" && contaOrigemExistente.saldo < valor) {
        return res.status(400).json({ mensagem: "Saldo insuficiente para realizar a transferência!" });
    }

    if (operacao === "depositar") {
        contaExistente.saldo += valor;
    } else if (operacao === "sacar") {
        contaExistente.saldo -= valor;

    } else if (operacao === "transferir") {
        contaOrigemExistente.saldo -= valor;
        contaDestinoExistente.saldo += valor;
    }

    const dataFormatada=criarDataFormatada();

    //registra o depósito
    if (operacao === "depositar") {

        const novaTransacao = {
            data: dataFormatada,
            numero_conta,
            valor
        };

        bancodedados.depositos.push(novaTransacao);

        //registra o saque
    } else if (operacao === "sacar") {
        const novaTransacao = {
            data: dataFormatada,
            numero_conta,
            valor
        };

        bancodedados.saques.push(novaTransacao);

        // Registra a transferência
    }else if (operacao === "transferir") {
        let novaTransacao;

        if (contaOrigemExistente.saldo >= valor) {
            novaTransacao = {
                data: dataFormatada,
                numero_conta_origem,
                numero_conta_destino,
                valor
            };

            // Cria o array transferencias Enviadas no momento da transferência
            if (!contaOrigemExistente.transferenciasEnviadas) {
                contaOrigemExistente.transferenciasEnviadas = [];
            }
            contaOrigemExistente.transferenciasEnviadas.push(novaTransacao); // Adicionará à lista de transferências enviadas

            // Cria o array transferencias Recebidas no momento da transferência
            if (!contaDestinoExistente.transferenciasRecebidas) {
                contaDestinoExistente.transferenciasRecebidas = [];
            }
            contaDestinoExistente.transferenciasRecebidas.push(novaTransacao); // Adicionará à lista de transferências recebidas
        }

        bancodedados.transferencias.push(novaTransacao); // Adicionará à lista de todas as transferências
    }
    return res.status(201).send();
};


const depositar = (req, res) => {
    return realizarTransacao(req, res, "depositar");
};

const sacar = (req, res) => {
    return realizarTransacao(req, res, "sacar");
};

const transferir = (req, res) => {
    return realizarTransacao(req, res, "transferir");
}


module.exports = {
    depositar,
    sacar,
    transferir
};