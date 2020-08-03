const {date, graduation, serie, age} = require ("../lib/utils")
const Teacher = require ("../../models/Teacher")

module.exports = {

    index(req,res) {
        
        Teacher.all(function (teachers) {
            
            teachers = teachers.map( teacher => {
               const newTeacher = {
                   ...teacher,
                   materias: teacher.materias.split(",")
               }
               return newTeacher
           })
           
            return res.render("./teachers/teachers", {teachers})
        })
    
    },

    create  (req,res) {
    return res.render ("./teachers/teacher-create") 
    },

    post(req,res) {

    const keys = Object.keys (req.body)

    for (key of keys) {
        if (req.body[key] == "") {
          return res.send ("Por favor, preencha todos os campos!!")
        }
    }

    Teacher.create(req.body, function(teachers) {
        return res.redirect(`/teachers/${teachers.id}`)
    })

},

    show(req,res) { 
        Teacher.show(req.params.id, function(teachers) {
            if (!teachers) return res.send ("Professor não encontrado!")

            teachers.created_at = date(teachers.created_at).created_at
            teachers.age = age(teachers.birth)
            teachers.tipo_aula = teachers.tipo_aula.split(",")
            teachers.materias = teachers.materias.split (",")
            teachers.escolaridade = graduation(teachers.escolaridade)
            
            return res.render("./teachers/show-teacher", {teachers})


        })

    },

    edit(req,res) {

        Teacher.show(req.params.id, function(teacher) {
            if (!teacher) return res.send ("Professor não encontrado!")

            teacher.birth = date(teacher.birth).iso
                        
            return res.render ("./teachers/teacher-edit", {teacher})


        })
    

},

    put(req,res) {

        const keys = Object.keys (req.body)

        for (key of keys) {
            if (req.body[key] == "") {
              return res.send ("Por favor, preencha todos os campos!!")
            }
        }

        Teacher.update (req.body, function () {
            return res.redirect (`/teachers/${req.body.id}`)

        }) 



},

    delete(req,res) {

        Teacher.delete(req.body.id, function () {
            return res.redirect (`/teachers`)
        })
  
},

}