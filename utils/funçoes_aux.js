//-------------------------------------- Função para verificar comentario ----------------------------------------------// 

function Verificar_comentario(comentario){

    //um array para verificar se houver um erro
    let erros = []

    //verifica: se tiver comentario, se o comentario foir undefined ou nulo ou Nao permite comentaris menores que 6 letras
    if (!comentario || typeof comentario !== 'string' ||comentario.trim().length < 6  ){
        erros.push({ texto: "O comentário precisa ter mais de 6 caracteres!" });
    }
    return erros;
}

//-------------------------------------- Função para verificar maquinas ------------------------------------------------// 

function Verificar_maquina(maquina) {
    const { modelo, marca, peso, potencia, largura, altura } = maquina;
    let erros = [];  

    if (!modelo || typeof modelo !== 'string' || modelo.trim().length === 0) {
        erros.push({ texto: "Modelo não pode estar vazio" });
    }

    if (!marca || typeof marca !== 'string' || marca.trim().length === 0) {
        erros.push({ texto: "Marca não pode estar vazia" });
    }

    if (!peso || isNaN(peso) || parseFloat(peso) <= 0) {
        erros.push({ texto: "Peso deve ser um número válido e maior que zero" });
    }

    if (!potencia || isNaN(potencia) || parseFloat(potencia) <= 0) {
        erros.push({ texto: "Potência deve ser um número válido e maior que zero" });
    }

    if (!largura || isNaN(largura) || parseFloat(largura) <= 0) {
        erros.push({ texto: "Largura deve ser um número válido e maior que zero" });
    }

    if (!altura || isNaN(altura) || parseFloat(altura) <= 0) {
        erros.push({ texto: "Altura deve ser um número válido e maior que zero" });
    }

    return erros;
}



module.exports = {
    Verificar_comentario,
    Verificar_maquina
};