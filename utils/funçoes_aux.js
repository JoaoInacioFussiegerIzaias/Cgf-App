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
        return erros;
    }

    if (!marca || typeof marca !== 'string' || marca.trim().length === 0) {
        erros.push({ texto: "Marca não pode estar vazia" });
        return erros;
    }

    if (!peso || isNaN(peso) || parseFloat(peso) <= 0) {
        erros.push({ texto: "Peso deve ser um número válido" });
        return erros;
    }

    if (!potencia || isNaN(potencia) || parseFloat(potencia) <= 0) {
        erros.push({ texto: "Potência deve ser um número válido " });
        return erros;
    }

    if (!largura || isNaN(largura) || parseFloat(largura) <= 0) {
        erros.push({ texto: "Largura deve ser um número válido" });
        return erros;
    }

    if (!altura || isNaN(altura) || parseFloat(altura) <= 0) {
        erros.push({ texto: "Altura deve ser um número válido" });
        return erros;
    }

    return erros;
    
}

function Verificar_usuario(usuario){
    const {nome, sobrenome, email, telefone, senha, senha_2} = usuario

    let erros = []

    if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
        erros.push({ texto: "1" });
    }
    if (!sobrenome || typeof sobrenome !== 'string' || sobrenome.trim().length === 0) {
        erros.push({ texto: "2" });
    }

    if (!email || typeof email !== 'string' || email.trim().length === 0) {
        erros.push({ texto: "3" });
    }
    if (telefone < 5) {
        erros.push({texto: "numero precisa existir!"});
    }
    if (senha < 4) {
        erros.push({texto: "senha precisa ser maior de 4 caracteres"});
    }
    if (senha != senha_2) {
        erros.push({texto: "as senhas precisam ser iguais, tente novamente!"});
    }
    return erros;
}
    

module.exports = {
    Verificar_comentario,
    Verificar_maquina,
    Verificar_usuario
};