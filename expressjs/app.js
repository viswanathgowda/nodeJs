const express = require("express")
const bodyparser = require("body-parser")
const app = express()

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyparser.urlencoded({extended: false}))

app.use('/admin',adminRoutes)//**filtering the paths */

app.use(shopRoutes)

app.use((req, res, next)=>{
    res.status(404).send('<h1>page not found</h1>') //**this method used for 404 page and if setted all the routes with respective pages */
})


app.listen(3000) //**it will work same  const server = http.createServer(routes.handler)  server.listen(3000)*/