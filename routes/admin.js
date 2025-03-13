const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("pagina principal adm")
})

router.get('/comentarios', (req, res) => {
    res.send("pagina principal adm comentarios")
})

module.exports = router