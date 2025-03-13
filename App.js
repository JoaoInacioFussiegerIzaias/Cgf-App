require('dotenv').config();

const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const admin = require("./routes/Admin")
const path = require('path')
const mongoose = require('mongoose')

const cgfApp = express()

// Tamplete Engine
cgfApp.engine('handlebars', handlebars.engine ({
    defaultLayout: 'main', runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))
cgfApp.set('view engine', 'handlebars')

//body-Parser
cgfApp.use(express.urlencoded({extended: true}));
cgfApp.use(express.json());

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


const port = process.env.DB_PORT

cgfApp.listen(port, () => {
    console.log("Server rodando")
})