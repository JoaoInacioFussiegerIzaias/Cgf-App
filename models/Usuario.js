//importação do mongodb
const mongoose = require('mongoose')

//Schema é um tipo que define como os dados serão armazenados
const Schema = mongoose.Schema

const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: true
    },
    telefone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    admin: {
        type: Number,
        default: 0
    },
    senha: {
        type: String,
        required: true
    }
})

//chama o mongoose para registrar o medelo no banco de dados
mongoose.model("usuarios", Usuario)