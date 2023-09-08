const criarDataFormatada = () => {
    const dataAtual = new Date();
    const diaAtual = dataAtual.getDate();
    const mesAtual = dataAtual.getMonth() + 1;
    const anoAtual = dataAtual.getFullYear();
    const dataFormatada = `${diaAtual.toString()
        .padStart(2, "0")}-${mesAtual.toString()
            .padStart(2, "0")}-${anoAtual} | ${dataAtual.getHours()
                .toString().padStart(2, "0")}:${dataAtual.getMinutes()
                    .toString().padStart(2, "0")}:${dataAtual.getSeconds()
            .toString().padStart(2, "0")}`;
    return dataFormatada;
}

module.exports = criarDataFormatada;