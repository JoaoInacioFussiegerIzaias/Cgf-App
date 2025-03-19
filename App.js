require('dotenv').config();

const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const admin = require("./routes/admin")
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
<<<<<<< HEAD

=======
require("./models/Maquina")
const Maquina = mongoose.model("maquinas")
>>>>>>> d3d1830 (not exist)
const cgfApp = express()
const usuarios = require('./routes/usuario') 

const secret = process.env.SESSESSION_SECRET
cgfApp.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true
}))
cgfApp.use(flash())

//Middleware
cgfApp.use((req,res,next) =>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})

//Body-Parser
cgfApp.use(express.urlencoded({extended: true}));
cgfApp.use(express.json());

// Tamplete Engine
cgfApp.engine('handlebars', handlebars.engine ({
    defaultLayout: 'main', runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))
cgfApp.set('view engine', 'handlebars')



//Mongoose connection
mongoose.Promise = global.Promise;
const db = process.env.DB_URL
mongoose.connect(db).then(() => {
    console.log("conectado ao mongo")
}).catch((err) => {
    console.log("Erro ao se conectar ou mongo "+ err)
})

//Public
cgfApp.use(express.static(path.join(__dirname, "public")))

//Rotas

//Home
cgfApp.get('/', (req, res) => {
    res.send("home")
})

//Admin
cgfApp.use('/admin', admin)

cgfApp.use('/usuarios', usuarios)

const port = process.env.DB_PORT

cgfApp.listen(port, () => {
    console.log("Server rodando")
})