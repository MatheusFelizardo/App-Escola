const fs = require ("fs")
const data = require ("./data.json")
const utils = require ("./utils")
const intl = require ("intl")

exports.post = function (req,res) {

    const keys = Object.keys (req.body)

    for (key of keys) {
        if (req.body[key] == "") {
          return res.send ("Por favor, preencha todos os campos!!")
        }
    }


    let {avatar_url,name,birth,escolaridade,tipo_aula,materias} = req.body

    birth = Date.parse (birth)
    const created_at = Date.now()
    const id = Number (data.teachers.length + 1)

    data.teachers.push ({
        id,
        name,
        avatar_url,
        birth,
        escolaridade,
        tipo_aula,
        materias,
        created_at
    })

    fs.writeFile ("data.json", JSON.stringify (data, null, 2), function (err){
        if (err) return res.send ("Write files error!")
    
        return res.redirect ("/teachers")
    })
}

exports.show = function (req,res) {

    const {id} = req.params 
    const foundTeacher = data.teachers.find (function (teachers){
        return teachers.id == id
    }) 
    
    if (!foundTeacher) return res.send("Professor(a) não encontrado!!")

    const teachers = {
        ...foundTeacher,
        age: utils.age(foundTeacher.birth),
        escolaridade: utils.graduation(foundTeacher.escolaridade),
        tipo_aula: foundTeacher.tipo_aula.split(","),
        materias: foundTeacher.materias.split(","),
        created_at: new intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
    }

    return res.render("show-teacher", {teachers})
}

exports.edit = function (req,res) {

    const {id} = req.params 
    const foundTeacher = data.teachers.find (function (teachers){
        return teachers.id == id
    }) 
    
    if (!foundTeacher) return res.send("Professor(a) não encontrado!!")

    const teacher = {
        ...foundTeacher,
        birth: utils.date(foundTeacher.birth)
    }

    
    return res.render ("teacher-edit", {teacher})

}
