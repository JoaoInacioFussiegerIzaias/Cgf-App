module.exports = {
    eAdmin: function(req, res, next){
        if(req.isAuthenticated() && req.user.eAdmin == 1){
            return next();
        }

    req.flash("error_msg", "Voce precisa ser Admin para acessar essa página")
    res.redirect("/")

    }
}