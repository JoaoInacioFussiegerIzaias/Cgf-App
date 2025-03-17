const mongoose = require('mongoose')
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
        type: Number,
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

mongoose.model("maquinas", Maquina) 





// Relacionamento entre 2 ''models'', não irei usar agora.

//comentario:{
//    type: Schema.Type.ObjectId,
//    ref: "comentarios",
//    required: true
//}