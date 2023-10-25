const express = require("express")

const app = express()

app.use('/',(req, res, next)=>{
    console.log('in the middle ware')
    next() //**it will call the next middle ware, all middle ware works from top to bottom, if not given the next() callback method other middle ware wont execute, also even after sending the response in any of the middle ware if we call next() callback it will throw an error */
})
app.use('/add-product',(req, res, next)=>{
    console.log('next middle ware')
    res.send("<h1>add product</h1>")
})
app.use('/',(req, res, next)=>{
    console.log('in the middle ware')
    res.send("<h1>hello from expressjs</h1>")
})

app.listen(3000) //**it will work same  const server = http.createServer(routes.handler)  server.listen(3000)*/