const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Comentario")
const Comentario = mongoose.model("comentarios")

router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/comentarios', (req, res) => {
    res.render("admin/comentarios")
})

router.get('/comentarios/add', (req, res) => {
    res.render("admin/addcomentarios")
})

router.post("/new/comentario", (req, res) =>{
    const newComentario = {
        comentario: req.body.comentario
    }
    new Comentario(newComentario).save().then(() => {
        console.log("Comentario cadastrado com sucesso")
    }).catch((err) => {
        console.log("Erro ao salvar comentario")
    })
})

module.exports = router