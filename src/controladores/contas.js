const bancodedados = require("../dados/bancodedados");//pego o array do banco
const verificaCampoString = require("../funcoesAuxiliares/verificaCampoString");
const verificarCampoExistente = require("../funcoesAuxiliares/verificarCampoExistente");
const verificarCampoVazio = require("../funcoesAuxiliares/verificarCampoVazio");

let numeroProximaContaCriada = bancodedados.contas.length + 1000;

//listar todas
const listarContas = (req, res) => {

    if (bancodedados.contas.length === 0) {
        return res.status(404).json({ mensagem: "Nenhuma conta encontrada!" })
    }

    return res.json(bancodedados.contas);
}

//criar conta
const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    //chamo a funcao pra verficar campos vazios com as variáveis obrigatórias por parâmetro
    const camposObrigatoriosStrings = ["nome", "cpf", "data de nascimento", "telefone", "email", "senha"];

    const resultadoVerificacaoVazios = verificarCampoVazio(camposObrigatoriosStrings,nome, cpf, data_nascimento, telefone, email, senha);

    if (resultadoVerificacaoVazios.erro) {
        return res.status(400).json({
            mensagem: resultadoVerificacaoVazios.mensagem
        });
    }
    //chamo a funcao pra verficar campos que nao sao strings
    const resultadoVerificacaoStrings = verificaCampoString(camposObrigatoriosStrings,[nome, cpf, data_nascimento, telefone, email, senha]);

    if (resultadoVerificacaoStrings.erro) {
        return res.status(400).json({
            mensagem: resultadoVerificacaoStrings.mensagem
        });
    }
    //verficar campos iguais com as variáveis obrigatórias por parâmetro
    const cpfExistente = bancodedados.contas.some(conta => conta.usuario && conta.usuario.cpf === cpf);
    const emailExistente = bancodedados.contas.some(conta => conta.usuario && conta.usuario.email === email);

    const resultadoVerificacaoExistentes = verificarCampoExistente(["CPF", "Email"],[cpfExistente, emailExistente]);

    if (resultadoVerificacaoExistentes.erro) {//se houver itens iguais retorna erro, senão cria a conta
        return res.status(400).json({
            mensagem: resultadoVerificacaoExistentes.mensagem
        });
    }

    const novaConta = {
        numero: numeroProximaContaCriada.toString(),
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };

    bancodedados.contas.push(novaConta);
    numeroProximaContaCriada++;//após cada conta criada ele incrementa +1 à variável

    return res.status(201).send();//não enviar nada no corpo da requisição
}


//alterar apenas os dados do usuário
const alterarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const contaDaRequisicao = req.params.numeroConta;

    const contaExistente = bancodedados.contas.find(conta => {
        return conta.numero === contaDaRequisicao;
    });

    if (!contaExistente) {
        return res.status(404).json({ mensagem: "A conta informada não existe!" });
    }

    //ver campos vazios
    const resultadoVerificacaoVazios = verificarCampoVazio(
        ["nome", "cpf", "data de nascimento", "telefone", "email", "senha"],
        nome, cpf, data_nascimento, telefone, email, senha);

    if (resultadoVerificacaoVazios.erro) {
        return res.status(400).json({
            mensagem: resultadoVerificacaoVazios.mensagem
        });
    }

    const resultadoVerificacaoStrings = verificaCampoString(
        ["nome", "cpf", "data de nascimento", "telefone", "email", "senha"],
        [nome, cpf, data_nascimento, telefone, email, senha]
    );

    if (resultadoVerificacaoStrings.erro) {
        return res.status(400).json({
            mensagem: resultadoVerificacaoStrings.mensagem
        });
    }

    //impedir campos iguais, exceto se for os dados desta própria conta
    const cpfExistente = bancodedados.contas.some(conta => {
        return conta.numero !== contaDaRequisicao && conta.usuario && conta.usuario.cpf === cpf;
        /*núm da conta no bancodedados for diferente do núm da conta digitada na requisição
        e, existir o usuário no bancodedados e o cpf do usuário do bancodedados for igual
        ao cpf digitado na requisição.*/
    });

    const emailExistente = bancodedados.contas.some(conta => {
        return conta.numero !== contaDaRequisicao && conta.usuario && conta.usuario.email === email;
    });

    const resultadoVerificacaoExistentes = verificarCampoExistente(["CPF", "Email"],[cpfExistente, emailExistente]);

    if (resultadoVerificacaoExistentes.erro) {//se houver itens iguais retorna erro, senão cria a conta
        return res.status(400).json({
            mensagem: resultadoVerificacaoExistentes.mensagem
        });
    }

    contaExistente.usuario.nome = nome;
    contaExistente.usuario.cpf = cpf;
    contaExistente.usuario.data_nascimento = data_nascimento;
    contaExistente.usuario.telefone = telefone;
    contaExistente.usuario.email = email;
    contaExistente.usuario.senha = senha;

    return res.status(201).send();//nenhum conteúdo no corpo (body) da resposta
}


//excluir conta
const deletarConta = (req, res) => {
    const contaDaRequisicao = req.params.numeroConta;

    const numeroContaAExcluir = bancodedados.contas.findIndex(conta => {
        return conta.numero === contaDaRequisicao;
    });

    if (numeroContaAExcluir === -1) {
        return res.status(404).json({ mensagem: "A conta informada não existe!" });
    }

    if (bancodedados.contas[numeroContaAExcluir].saldo !== 0) {
        return res.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
    }

    bancodedados.contas.splice(numeroContaAExcluir, 1);

    return res.status(201).send();//nenhum conteúdo no corpo (body) da resposta
}


const exibirInformacoes = (req, res, operacao)=>{
    const { numero_conta,senha} = req.query;
    
    //Verificar se o numero da conta e a senha foram informadas (passado como query params na url)
    const resultadoVerificacaoVazios = verificarCampoVazio(["numero_conta", "senha"], numero_conta, senha);
    
    if (resultadoVerificacaoVazios.erro) {
        return res.status(400).json({
            mensagem: resultadoVerificacaoVazios.mensagem
        });
    }
    
    //Verificar se a conta bancária informada existe
    const contaExistente = bancodedados.contas.find(conta => {
        return conta.numero === numero_conta;
    });

    if (!contaExistente) {
        return res.status(404).json({ mensagem: "A conta informada não existe!" });
    }

    //Verificar se a senha informada é uma senha válida
    if (senha !== contaExistente.usuario.senha) {
        return res.status(403).json({ mensagem: "Senha incorreta!" });
    }

    if (contaExistente && operacao === "saldo") {
        //Exibir o saldo da conta bancária em questão
        return res.status(201).json({saldo: contaExistente.saldo})
        
        //Exibir o extrato da conta bancária em questão
    } else if (contaExistente && operacao === "extrato") {
        const transacoesDaConta = {
            depositos: bancodedados.depositos.filter(transacao => transacao.numero_conta === numero_conta),
            saques: bancodedados.saques.filter(transacao => transacao.numero_conta === numero_conta),
            transferenciasEnviadas: contaExistente.transferenciasEnviadas || [],
            transferenciasRecebidas: contaExistente.transferenciasRecebidas || []
        };
    
        return res.status(200).json(transacoesDaConta);
    }

}


const saldo = (req, res) => {
    return exibirInformacoes(req, res, "saldo");
}
const extrato = (req, res) => {
    return exibirInformacoes(req, res, "extrato");
}

module.exports = {
    listarContas, criarConta, alterarConta, deletarConta,saldo,extrato
}