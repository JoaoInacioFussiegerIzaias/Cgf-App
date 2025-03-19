const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Comentario")
const Comentario = mongoose.model("comentarios") //Model Comentario
require("../models/Maquina")
const Maquina = mongoose.model("maquinas") //Model Maquina
const { Verificar_comentario, Verificar_maquina } = require('../utils/funçoes_aux');

//Pagina principal do adm
router.get('/', (req, res) => {
    res.render("admin/index")
})

// ------------------------------------------ Rotas Comentarios ------------------------------------- //

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
    res.render("admin/newcomentarios")
})

//Rota de envio de dados para o banco 
router.post("/new/comentario", (req, res) =>{
    const {comentario} = req.body

    // Passa o comentário para a função Verificar
    const erros = Verificar_comentario(comentario) 

    //se ouver algum erro
    if(erros.length == 0){  
        const newComentario =  { 
            comentario }
    
        new Comentario(newComentario).save()
            .then(() => {
                req.flash("success_msg", "Comentario adicionado")
                res.redirect("/admin/comentarios")
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro au comentar")
                res.render("admin/newcomentarios", {erros, comentario})
            })
    } else {
        req.flash("error_msg", "Houve um erro au comentar")
        res.render("admin/newcomentarios", {erros, comentario})
    }
})

//Rota para editar comentario
router.get("/edit/comentario/:id", (req,res) => {
    Comentario.findOne({_id:req.params.id}).lean()
    .then((comentario) => {
            res.render("admin/editcomentario", {comentario: comentario}) 
        }).catch((err) =>{
            req.flash("error_msg", "Esse comentario não existe")
            res.redirect("/admin/comentarios")
        })
})

//Rota para editar o comentario
router.post("/edit/comentario", (req,res) => {
    const {comentario, id} = req.body
    
    // Passa o comentário para a função Verificar
    const erros = Verificar_comentario(comentario) 

    //if para saber se ha algum erro
    if (erros.length == 0){
        Comentario.findOne({_id: id}).then((comentario_alterado) => {
            if (!comentario_alterado) {
                req.flash("error_msg", "Houve um erro ao editar comentário")
                res.render("/admin/comentarios", {erros, comentario, id})
            }

            // Atualiza os dados do comentário
            
            comentario_alterado.comentario = comentario;

            // Salvando o comentário alterado
            comentario_alterado.save().then(() => {
                req.flash("success_msg", "Comentario editado")
                res.redirect("/admin/comentarios")
            }).catch((err) =>{
                req.flash("error_msg", "Houve um erro ao editar a comentário")
                res.render("/admin/comentarios", {erros, comentario, id});
            })
        
        }).catch((err) => {
            req.flash("error_mdg", "Houve um erro ao editar o comentário")
            res.render("/admin/comentarios", {erros, comentario, id});
        })

    } else {
        req.flash("error_msg", "O comentário precisa ter mais de 6 caracteres!");
        return res.redirect(`/admin/edit/comentario/${id}`);
    }
})

router.post("/delete/comentario", (req,res) => {
    Comentario.deleteOne({_id: req.body.id}).then(() =>{
        req.flash("success_msg", "Comentario deletado com sucesso")
        res.redirect("/admin/comentarios")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao deletar o comentario" + err)
        res.redirect("/admin/comentario")
    })
})

// ------------------------------------- Rotas Maquinas ------------------------------------- //

router.get("/maquinas", (req,res) =>{
    Maquina.find().sort({data: 'desc'}).lean().then((maquinas) =>{
        res.render("admin/maquinas", {maquinas: maquinas})
    }).catch((err)=> {
        req.flash("error_msg", "Houve um erro ao tentar listar a pagina")
        res.redirect("/admin")
    })
})

router.get("/new/maquina", (req,res) =>{
    res.render("admin/newmaquina")
})

router.post("/new/maquina", (req,res) =>{

    const { modelo, marca, peso, potencia, largura, altura} = req.body
    const erros = Verificar_maquina({modelo, marca, peso, potencia, largura, altura}) 

    if(erros.length == 0){
        const newMaquina = {
            modelo,
            marca,
            peso,
            potencia,
            largura,
            altura
        }

        new Maquina(newMaquina).save().then(() =>{
            req.flash("success_msg", "Maquina criada com sucesso")
            res.redirect("/admin/maquinas")
        }).catch(() =>{
            req.flash("error_msg", "Houve um erro ou salvar maquina")
            res.render("admin/newmaquina", {erros, modelo, marca, peso, potencia, largura, altura})
        })
    } else {
        req.flash("error_msg", "Houve um erro ou salvar maquina")
        res.render("admin/newmaquina", {erros, modelo, marca, peso, potencia, largura, altura})
    }
})

router.get("/edit/maquina/:id", (req,res) => {
    Maquina.findOne({_id: req.params.id}).lean()
    .then((maquina) => {
            res.render("admin/editmaquina", {maquina: maquina}) 
        }).catch((err) =>{
            req.flash("error_msg", "Essa máquina não existe")
            res.redirect("/admin/maquinas")
        })
})

router.post("/edit/maquina", (req,res) =>{
    const { modelo, marca, peso, potencia, largura, altura, id} = req.body

    const erros = Verificar_maquina({modelo, marca, peso, potencia, largura, altura})

    if (erros.length == 0){
        Maquina.findOne({_id: id}).then((maquina_alterada) =>{
            if (!maquina_alterada) {
                req.flash("error_msg", "Houve um erro ao editar maquina")
                res.render("admin/maquinas" , {erros, modelo, marca, peso, potencia, largura, altura, id})
            }

            // Atualiza os dados da maquina

            maquina_alterada.modelo = modelo;
            maquina_alterada.marca = marca;
            maquina_alterada.peso = peso;
            maquina_alterada.potencia = potencia;
            maquina_alterada.largura = largura;
            maquina_alterada.altura = altura;
            
            maquina_alterada.save().then(() => {
                req.flash("success_msg", "Maquina editada")
                res.redirect("/admin/maquinas")
            }).catch((err) =>{
                req.flash("error_msg", "Houve um erro ao tentar editar")
                res.render("/admin/maquinas", {erros, modelo, marca, peso, potencia, largura, altura, id})
            })

        }).catch((err) =>{
            req.flash("error_msg", "Houve um erro ao tentar editar a maquina")
            res.render("admin/maquinas" , {erros, modelo, marca, peso, potencia, largura, altura, id})
        })
        
    } else {
        req.flash("error_msg",  erros[0]["texto"]);
        return res.redirect(`/admin/edit/maquina/${id}`, );
    }
})


router.post("/delete/maquina", (req,res) => {
    Maquina.deleteOne({_id: req.body.id}).then(() =>{
        req.flash("success_msg", "Maquina deletada com sucesso")
        res.redirect("/admin/maquinas")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao deletar o maquina" + err)
        res.redirect("/admin/maquinas")
    })
})

module.exports = router