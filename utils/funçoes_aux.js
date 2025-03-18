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

module.exports = Verificar_comentario;

//-------------------------------------- -------------------------------- ----------------------------------------------// 

function Verificar_maquina(maquina){
    const {modelo, marca, peso, potencia, largura, altura} = maquina

    let erros = []

    if( !modelo || !marca || !peso || !potencia || !largura || !altura){
        erros.push({texto: "Prencha todos os campos"})
    }
    return erros;
}

module.exports = Verificar_maquina;

