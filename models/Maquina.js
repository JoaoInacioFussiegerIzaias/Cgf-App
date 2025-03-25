//importação do mongodb
const mongoose = require('mongoose')

//Schema é um tipo que define como os dados serão armazenados
const Schema = mongoose.Schema;

const Maquina = new Schema({
    modelo:{
        type: String,
        required: true
    },
    marca:{
        type: String,
        required: true
    },
    peso:{
        type: Number,
        required: true
    },
    potencia:{
        type: Number,
        required: true
    },
    largura:{
        type: String,
        required: true
    },
    altura:{
        type: Number,
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

//chama o mongoose para registrar o medelo no banco de dados
mongoose.model("maquinas", Maquina) 





// Relacionamento entre 2 ''models'', não irei usar agora.

//comentario:{
//    type: Schema.Type.ObjectId,
//    ref: "comentarios",
//    required: true
//}