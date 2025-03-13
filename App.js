const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
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

const PORT = "PORT"
cgfApp.listen(PORT, () => {
    console.log("Server rodando")
})