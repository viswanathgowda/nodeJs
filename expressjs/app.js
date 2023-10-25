const express = require("express")
const bodyparser = require("body-parser")
const app = express()

app.use(bodyparser.urlencoded())
app.use('/add-product',(req, res, next)=>{
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>')
})
app.post('/product',(req, res, next)=>{
    console.log(req.body)
    res.redirect('/')
})

app.use('/',(req, res, next)=>{
    res.send("<h1>hello from expressjs</h1>")
})

app.listen(3000) //**it will work same  const server = http.createServer(routes.handler)  server.listen(3000)*/