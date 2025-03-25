const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const { Verificar_usuario } = require("../utils/funçoes_aux")
const bcrypt = require('bcryptjs')
const passport = require("passport")


router.get("/cadastro", (req,res) =>{
    res.render("usuarios/cadastro")
})

router.get("/login", (req,res) => {
    res.render("usuarios/login")
})

router.post("/new/cadastro", (req, res) => {
    const { nome, sobrenome, telefone, email, senha, senha_2 } = req.body;
    const erros = Verificar_usuario({ nome, sobrenome, telefone, email, senha, senha_2 });

    // Se houver erros de validação
    if (erros.length > 0) {
        req.flash("error_msg", "Erro na validação");
        return res.render("usuarios/cadastro", { erros });  // Usando return para garantir que o código pare aqui
    }

    // Se não houver erros de validação
    Usuario.findOne({ email: req.body.email }).lean().then((usuario) => {
        if (usuario) {
            req.flash("error_msg", "Já existe esse email no banco de dados");
            return res.redirect("/usuarios/cadastro");  // Redireciona e para a execução aqui
        } else {
            const newUsuario = new Usuario({
                nome,
                sobrenome,
                telefone,
                email,
                senha
            });

            bcrypt.genSalt(10, (erro, salt) => {
                if (erro) {
                    req.flash("error_msg", "Erro ao gerar salt");
                    return res.redirect("/usuarios/cadastro");  // Redireciona caso erro ao gerar salt
                }

                bcrypt.hash(newUsuario.senha, salt, (erro, hash) => {
                    if (erro) {
                        req.flash("error_msg", "Erro ao gerar hash da senha");
                        return res.redirect("/usuarios/cadastro");  // Redireciona caso erro ao gerar hash
                    }

                    newUsuario.senha = hash;

                    newUsuario.save()
                        .then(() => {
                            req.flash("success_msg", "Usuário criado com sucesso");
                            return res.redirect("/");  // Redireciona após salvar o novo usuário
                        })
                        .catch((err) => {
                            req.flash("error_msg", "Houve um erro ao cadastrar o usuárioooooooooooo" + err);
                            return res.redirect("/usuarios/cadastro");  // Redireciona caso ocorra erro ao salvar
                        });
                });
            });
        }
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao verificar o email");
        return res.render("usuarios/cadastro", { erros, nome, sobrenome, telefone, email, senha, senha_2 });
    });
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local" , {
        successRedirect: "/",
        failureRedirect: "/usuarios/login",
        failureFlash: true
    })(req, res, next)
})


module.exports = router