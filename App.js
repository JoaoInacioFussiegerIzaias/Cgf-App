const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const admin = require("./routes/Admin")
const path = require('path')
//const mongoose = require('mongoose')

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

//Public
cgfApp.use(express.static(path.join(__dirname, "public")))

//Rotas


//Home
cgfApp.get('/', (req, res) => {
    res.send("home")
})

//Admin
cgfApp.use('/admin', admin)


const PORT = "PORT"
cgfApp.listen(PORT, () => {
    console.log("Server rodando")
})