const path = require("path")
const express = require("express")

const router = express.Router()

const rootDir = require('../util/path')
const admindata = require('./admin')

router.get('/',(req, res, next)=>{
    // console.log(admindata.products) //**sharing the data across requests and users., but this process not recommended to shares data, bcz when we use multiple browsers stil we have the older values which was generated on ther browser*/
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    res.render('shop')
})

module.exports =router