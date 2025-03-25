const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

//model de usuario
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

//autenticação de usuarios com passaport
module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email', passwordField: "senha"}, (email, senha, done) => {
        Usuario.findOne({email: email}).then((usuario) => {
            if (!usuario){
                return done(null, false, {message: "Conta não existe"})
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem) =>{
                if(batem){
                    return done(null, usuario)
                } else {
                    return done(null, false, {message: "Senha incorrta, tente novamente"})
                }
            })

        })
    }))

passport.serializeUser((usuario, done) => {
    done(null, usuario.id)
})

passport.deserializeUser((id, done) => {
    Usuario.findById(id)
        .then(usuario => {
            done(null, usuario);
        })
        .catch(err => {
            done(err, null);
        });
});

}