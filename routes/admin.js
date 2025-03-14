const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Comentario")

//my model
const Comentario = mongoose.model("comentarios")

//Pagina principal do adm
router.get('/', (req, res) => {
    res.render("admin/index")
})

// All comentarios
router.get('/comentarios', (req, res) => {

    //sort serve para ordenar os comentarios em ordem decresente (mais novo para o mais antigo)
    Comentario.find().sort({data: 'desc'}).lean().then((comentarios) =>{
        res.render("admin/comentarios", {comentarios: comentarios})
    }).catch((err)=> {
        res.flash("error_msg", "Houve um erro ao tentar listar a pagina")
        res.redirect("/admin")
    })
})

//Rota para fazer um novo comentario
router.get('/new/comentario', (req, res) => {
    res.render("admin/addcomentarios")
})

//Rota de envio de dados para o banco 
router.post("/new/comentario", (req, res) =>{
    
    //um array para verificar se houver um erro
    var erros = []
    
    //verifica: se tiver comentario, se o comentario foir undefined ou nulo
    if (!req.body.comentario || typeof req.body.comentario == undefined|| req.body.comentario == null){
        erros.push({texto: "Comentário inválido"})
    }
    
    // Nao permite comentaris menores que 6 letras
    if(req.body.comentario.length < 6){
        erros.push({texto: "Comentario precisa ter mais de 6 caracteres!"})
    }

    //se ouver algum erro
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