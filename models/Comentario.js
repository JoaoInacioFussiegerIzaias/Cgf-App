//importação do mongodb
const mongoose = require('mongoose')

//Schema é um tipo que define como os dados serão armazenados
const Schema = mongoose.Schema;

const Comentario = new Schema({
    comentario: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

//chama o mongoose para registrar o medelo no banco de dados 
mongoose.model("comentarios", Comentario)