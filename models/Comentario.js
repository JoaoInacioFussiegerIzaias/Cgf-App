const mongoose = require('mongoose')
const schema = mongoose.Schema;

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


//mongoose.model("comentarios", Comentario)