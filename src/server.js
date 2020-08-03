const express = require ("express")
const routes = require ("../src/routes")
const server = express()
const nunjucks = require ("nunjucks")
const methodOverride = require ("method-override")

server.use(express.urlencoded({ extended: true}))
server.set ("view engine", "njk")
server.use (methodOverride("_method"))

server.use (routes)
nunjucks.configure ("src/app/views", {
    express: server, 
    autoescape: false,
    noCache: true
})

server.use(express.static('public'))


server.listen (5000, () => {console.log ("Servidor rodando")})