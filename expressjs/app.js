const http = require("http")
const express = require("express")

const app = express()

app.use((req, res, next)=>{
    console.log('in the middle ware')
    next() //**it will call the next middle ware */
})
app.use((req, res, next)=>{
    console.log('next middle ware')
})

const server = http.createServer(app)
server.listen(3000)