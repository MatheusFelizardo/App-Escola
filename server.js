const express = require ("express")
const routes = require ("./routes")
const server = express()
const nunjucks = require ("nunjucks")

server.use(express.urlencoded({ extended: true}))
server.use (routes)
server.set ("view engine", "njk")
nunjucks.configure ("views", {
    express: server, 
    autoescape: false,
    noCache: false
})

server.use(express.static('public'))
server.use (express.static('assets'))



server.listen (5000, () => {console.log ("Servidor rodando")})