const {date} = require ("../app/lib/utils")
const db = require ("../../src/config/db")

module.exports = {

    all(callback) {
        db.query (`
        SELECT students.*, teachers.name AS teacher_name
        FROM students  
        LEFT JOIN teachers ON (teachers.id = students.teacher_id)
        ORDER BY students.name ASC
        `, function (err, results) {

            if (err) throw `Database error! ${err}` 
            
            callback(results.rows)
        })
    },

    create(data, callback) {
        const query = 
    `INSERT INTO students (
        name,
        avatar_url,
        birth,
        email,
        escolaridade,
        carga_horaria,
        teacher_id
    ) VALUES ($1, $2, $3, $4, $5, $6,$7)
        RETURNING id
    `
        
    const values = [
        data.name,
        data.avatar_url,
        date(data.birth).iso,
        data.email,
        data.escolaridade,
        data.carga_horaria,
        data.teacher
    ]

    db.query(query, values, function (err, results) {

        if (err) throw `Database error! ${err}` 
        
        callback (results.rows[0])
    })


    },

    show(id, callback) {
        
        db.query(`
            SELECT students.*, teachers.name AS teacher_name
            FROM students 
            LEFT JOIN teachers ON (teachers.id = students.teacher_id)
            WHERE students.id = $1`, [id], function(err,results) 
            {
                if(err) throw `Database error! ${err}` 

                callback(results.rows[0])
            })

    },

    update(data, callback) {
        
        const query =
            `
        UPDATE students SET
            avatar_url = ($1),
            name = ($2),
            birth = ($3),
            escolaridade = ($4),
            email = ($5),
            carga_horaria = ($6),
            teacher_id = ($7)

        WHERE id = ($8)
            `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.escolaridade,
            data.email,
            data.carga_horaria,
            data.teacher,
            data.id,
        ]

        db.query(query, values, function (err, results) {

            if (err) throw `Database error! ${err}` 

            return callback()
        })
    },

    delete(id,callback) {

        db.query (` DELETE FROM students WHERE id = $1 `, [id] , function (err) {
            if (err) throw `Database error! ${err}` 
            
            return callback()
            })

    },

    teachersOptions(callback) {

        db.query(`
        SELECT *
        FROM teachers
        
        `, function(err, results) {
            if (err) throw `Database error! ${err}` 
            callback(results.rows)
        })

    },

    paginate(params){
        let {filter, limit, offset, callback} = params

        let query ="",
            filterQuery ="",
            totalQuery= `(
                SELECT count(*) FROM students
                ) AS total`


        if (filter) {
            
            filterQuery = `            
            WHERE students.name ILIKE '%${filter}%'
            OR students.email ILIKE '%${filter}%'
            ` 

            totalQuery = `(
            SELECT count(*) FROM students
            ${filterQuery}
            )
            AS total` 

        }

        query = `
        SELECT students.*, ${totalQuery}
        FROM students
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `


        db.query(query, [limit,offset], function (err, results) {
            if (err) throw `Database error! ${err}` 
            
            callback(results.rows)
        })
    }
}