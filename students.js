const fs = require ("fs")
const data = require ("./data.json")
const utils = require ("./utils")
const intl = require ("intl")

exports.index = function (req,res) {

    let students = data.students.map( students => {
        const newStudent = {
            ...students,
            escolaridade: utils.serie(students.escolaridade) 
        }
        return newStudent
    })


    return res.render("./students/students", {students})

}

exports.create = function (req,res) {
    return res.render ("./students/create") 
}

exports.post = function (req,res) {

    const keys = Object.keys (req.body)

    for (key of keys) {
        if (req.body[key] == "") {
          return res.send ("Por favor, preencha todos os campos!!")
        }
    }


    let {avatar_url,name,email,birth,escolaridade,carga_horaria} = req.body

    birth = Date.parse (birth)
    let id = 1
    let lastStudent = data.students[data.students.length -1]

    if (lastStudent) {
        id = lastStudent.id +1
    }

    data.students.push ({
        id,
        name,
        email,
        avatar_url,
        birth,
        escolaridade,
        carga_horaria,
    })

    fs.writeFile ("data.json", JSON.stringify (data, null, 2), function (err){
        if (err) return res.send ("Write files error!")
    
        return res.redirect ("/students")
    })
}

exports.show = function (req,res) {

    const {id} = req.params 
    const foundStudents = data.students.find (function (students){
        return students.id == id
    }) 
    
    if (!foundStudents) return res.send("Aluno(a) não encontrado!!")

    const students = {
        ...foundStudents,
        age: utils.age(foundStudents.birth),
        escolaridade: utils.serie(foundStudents.escolaridade),
        birthDay: utils.date(foundStudents.birth).birthDay
    }

    return res.render("./students/show", {students})
}

exports.edit = function (req,res) {

    const {id} = req.params 
    const foundStudents = data.students.find (function (students){
        return students.id == id
    }) 
    
    if (!foundStudents) return res.send("Aluno(a) não encontrado!!")

    const students = {
        ...foundStudents,
        birth: utils.date(foundStudents.birth).iso,
        
    }

    return res.render ("./students/edit", {students})

}

exports.put = function (req,res) {

    const {id} = req.body 
    let index = 0 

    const foundStudents = data.students.find (function (students, foundIndex) {
        if ( id == students.id) { 
            index = foundIndex
            return true    
        }
    })  
    
        if (!foundStudents) return res.send("Aluno(a) não encontrado!!")
    
         const students = {
        ...foundStudents,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
        }

        data.students[index] = students

        fs.writeFile ("data.json", JSON.stringify (data,null,2), function (err) {
            if (err) return res.send ("Aluno(a) não encontrado!!")

            return res.redirect (`/students/${id}`)
            
        })

}

exports.delete = function (req,res) {

    const {id} = req.body

    const filteredStudents = data.students.filter (function (students) {
        return students.id != id
    })

    data.students = filteredStudents 

    fs.writeFile ("data.json", JSON.stringify (data,null,2), function (err) {
        if (err) return res.send ("Aluno(a) não encontrado!!")

        return res.redirect (`/students`)
        
    })


}