const {date} = require ("../app/lib/utils")
const db = require ("../../src/config/db")

module.exports = {

    all(callback) {
        db.query (`SELECT * FROM students ORDER BY name ASC`, function (err, results) {

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
        carga_horaria
    ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
    `
        
    const values = [
        data.name,
        data.avatar_url,
        date(data.birth).iso,
        data.email,
        data.escolaridade,
        data.carga_horaria
    ]

    db.query(query, values, function (err, results) {

        if (err) throw `Database error! ${err}` 
        
        callback (results.rows[0])
    })


    },

    show(id, callback) {
        
        db.query(`
            SELECT * 
            FROM students 
            WHERE id = $1`, [id], function(err,results) {

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
            carga_horaria = ($6)

        WHERE id = ($7)
            `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.escolaridade,
            data.email,
            data.carga_horaria,
            data.id
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

    }

}