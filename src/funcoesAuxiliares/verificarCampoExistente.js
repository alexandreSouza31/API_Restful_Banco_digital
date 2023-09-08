const verificarCampoExistente = (nomeDoCampo, valorDoCampo) => {

    const campoComErro = [];//na hora de chamar a função eu preciso passar os campos a serem verificados entre colchetes

    for (let i = 0; i < valorDoCampo.length; i++) {//pega todo os campos que existem capturados no parametro no chamamento desta funcao
        if (valorDoCampo[i]) {
            campoComErro.push(nomeDoCampo[i])
        }
    }

    let mensagem;

    //mensagem é singular ou plural dinamicamente
    if (campoComErro.length === 1) {
        mensagem = `O campo '${campoComErro[0]}' já está cadastrado no sistema!`;
    } else if (campoComErro.length === 2) {
        nomeDoCampo = nomeDoCampo.join(" e ");
        mensagem = `Os campos '${campoComErro[0]}' e '${campoComErro[1]}' já estão cadastrados no sistema!`;
    } else {
        const ultimoCampo = campoComErro.pop();

        nomeDoCampo = nomeDoCampo.join(",", " e ");
        mensagem = `Os campos '${campoComErro.join(", ")} e ${ultimoCampo}' já estão cadastrados no sistema!`;
    }

    if (campoComErro.length > 0) {//se o valor passado no corpo for igual a um existente
        return {
            erro: true,
            mensagem
        }
    }
    return {//se não houverem campos iguais
        erro: false
    }
}

module.exports = verificarCampoExistente;