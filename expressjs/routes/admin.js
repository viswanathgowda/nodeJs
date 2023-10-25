const path = require("path")
const express = require("express")

const router = express.Router()
const rootDir = require('../util/path')
const products = []

//**admin path */
router.get('/add-product',(req, res, next)=>{
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
})
router.post('/add-product',(req, res, next)=>{
    products.push({title: req.body.title}) //**sharing the data across requests and users */
    res.redirect('/')
})

exports.routes = router
exports.products = products