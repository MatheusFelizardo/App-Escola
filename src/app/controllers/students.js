const {date, graduation, serie, age} = require ("../lib/utils")
const Student = require ("../../models/Student")


module.exports = {

    index(req,res) {
        
        Student.all(function (students) {
            
            students = students.map( student => {
               const newStudent = {
                   ...student,
                   escolaridade: serie(student.escolaridade)
               }
               return newStudent
           })
        
           return res.render("./students/students", {students})
        })
    
    },

    create  (req,res) {
    return res.render ("./students/create") 
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
                        
            return res.render ("./students/edit", {students})


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