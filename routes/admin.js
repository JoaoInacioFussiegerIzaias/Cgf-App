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

router.get('/new/comentario', (req, res) => {
    res.render("admin/addcomentarios")
})

router.post("/new/comentario", (req, res) =>{
    
    var erros = []
    
    if (!req.body.comentario || typeof req.body.comentario == undefined|| req.body.comentario == null){
        erros.push({texto: "Comentário inválido"})
    }
    
    if(req.body.comentario.length < 2){
        erros.push({texto: "Comentario precisa ter mais de 6 caracteres!"})
    }

    if(erros.length > 0){  
        res.render("admin/addcomentarios", {erros: erros})
    } else {

        const newComentario = {
            comentario: req.body.comentario
        }
    
    
        new Comentario(newComentario).save().then(() => {
            req.flash("success_msg", "Comentario adicionado")
            res.redirect("/admin/comentarios")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro au comentar")
            res.redirect("/admin/comentarios")
        })
    }

})

module.exports = router