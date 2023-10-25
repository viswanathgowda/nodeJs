const express = require("express")

const app = express()

app.use((req, res, next)=>{
    console.log('in the middle ware')
    next() //**it will call the next middle ware */
})
app.use((req, res, next)=>{
    console.log('next middle ware')
    res.send("<h1>hello from expressjs</h1>")
})

app.listen(3000) //**it will work same  const server = http.createServer(routes.handler)  server.listen(3000)*/