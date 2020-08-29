const {date, graduation, serie, age} = require ("../lib/utils")
const Student = require ("../../models/Student")
const { teachersOptions } = require("../../models/Student")


module.exports = {

    index(req,res) {

        let {filter, page, limit} = req.query

        page = page || 1
        limit = limit || 5 //limita

        let offset = limit * (page - 1) // a partir do elemento

       
        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students) {

                students = students.map( student => {
                    const newStudent = {
                        ...student,
                        escolaridade: serie(student.escolaridade)
                    }
                    return newStudent
                })

                let pagination = {
                    total: Math.ceil(students[0].total/limit),
                    page
                }

                return res.render("./students/students", {students, pagination, filter })  
            }
        }
      
        Student.paginate(params)
        
    },

    create  (req,res) {
        
        Student.teachersOptions  (function(teachers) {
            return res.render ("./students/create", {teachers})
        })
   
    },

    post(req,res) {

    const keys = Object.keys (req.body)

    for (key of keys) {
        if (req.body[key] == "") {
          return res.send ("Por favor, preencha todos os campos!!")
        }
    }

    Student.create(req.body, function(students) {
        return res.redirect(`/students/${students.id}`)
    })

},

    show(req,res) { 
        Student.show(req.params.id, function(students) {
            if (!students) return res.send ("Aluno não encontrado!")

            students.age = age(students.birth)
            students.birthDay = date(students.birth).birthDay
            students.escolaridade = serie(students.escolaridade)
        

            return res.render("./students/show", {students})
        })
                       


    },

    edit(req,res) {

        Student.show(req.params.id, function(students) {
            if (!students) return res.send ("Aluno não encontrado!")

            students.birth = date(students.birth).iso
            
            Student.teachersOptions(function (teachers){
                return res.render ("./students/edit", {teachers, students})

            }) 

            

        })
    

},

    put(req,res) {

        const keys = Object.keys (req.body)

        for (key of keys) {
            if (req.body[key] == "") {
              return res.send ("Por favor, preencha todos os campos!!")
            }
        }
        
        Student.update (req.body, function () {
           
            return res.redirect (`/students/${req.body.id}`)

        }) 



},

    delete(req,res) {

        Student.delete(req.body.id, function () {
            return res.redirect (`/students`)
        })
  
},


}