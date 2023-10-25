const express = require("express")
const bodyparser = require("body-parser")
const app = express()

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyparser.urlencoded({extended: false}))

app.use(adminRoutes)

app.use(shopRoutes)


app.listen(3000) //**it will work same  const server = http.createServer(routes.handler)  server.listen(3000)*/