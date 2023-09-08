const verificarCampoVazio = (nomeDoCampo, ...valorDoCampo) => {
    const camposComErro = [];
    
    for (let i = 0; i < nomeDoCampo.length; i++) {
        if (!valorDoCampo[i]) {
            camposComErro.push(nomeDoCampo[i]);
        }
    }
    
    let mensagem;

    if (camposComErro.length === 1) {
        mensagem = `O campo '${camposComErro[0]}' precisa ser preenchido!`;
    } else if (camposComErro.length > 1) {
        const ultimoCampo = camposComErro.pop();
        mensagem = `Os campos '${camposComErro.join(", ")} e ${ultimoCampo}' precisam ser preenchidos!`;
    }

    return {
        erro: camposComErro.length > 0,
        mensagem
    };
};

module.exports = verificarCampoVazio;