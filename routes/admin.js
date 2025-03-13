const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/comentarios', (req, res) => {
    res.render("admin/comentarios")
})

router.get('/comentarios/add', (req, res) => {
    res.render("admin/addcomentarios")
})
module.exports = router