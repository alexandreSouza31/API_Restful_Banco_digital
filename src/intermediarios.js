//esse é o midware. O param next precisa ser passado.
//Irá validar as rotas com senha antes delas serem chamadas
const validarSenha = (req, res, next) => {
    const { senha_banco } = req.query;//a senha a ser recuperada vai ser através do query, conforme a questoã pede.

    if (!senha_banco) {
        return res.status(401).json({ mensagem: "Precisa passar o intermediário no endpoint da rota" });
    }
    
    if (senha_banco !== "Cubos123Bank") {
        return res.status(401).json({ mensagem: "A senha do banco informada é inválida!" });
    }

    next();//se passar do if, chamo o next
}

module.exports = validarSenha;