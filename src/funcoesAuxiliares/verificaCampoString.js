const verificaCampoString = (nomeDoCampo, valorDoCampo) => {
    const campoComErro = valorDoCampo
        .map((valorDoCampo, index) => {
            if (typeof valorDoCampo !== "string") {
                return nomeDoCampo[index];
            }
            return null;
        })
        .filter(campoComErro => campoComErro !== null);

    let mensagem;

    if (campoComErro.length > 0) {
        if (campoComErro.length === 1) {
            mensagem = `O campo '${campoComErro[0]}' deve ser string!`;
        } else if (campoComErro.length === 2) {
            mensagem = `Os campos '${campoComErro[0]}' e '${campoComErro[1]}' devem ser strings!`;
        } else {
            const ultimoCampo = campoComErro.pop();
            mensagem = `Os campos '${campoComErro.join(", ")}' e '${ultimoCampo}' devem ser strings!`;
        }

        return {
            mensagem,
            erro: true
        };
    }

    return {
        erro: false
    };
};

module.exports = verificaCampoString;