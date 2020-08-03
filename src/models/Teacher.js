const {date} = require ("../app/lib/utils")
const db = require ("../../src/config/db")

module.exports = {

    all(callback) {
        db.query (`SELECT * FROM teachers`, function (err, results) {

            if (err) throw `Database error! ${err}` 
            
            callback(results.rows)
        })
    },

    create(data, callback) {
        const query = 
    `INSERT INTO teachers (
        name,
        avatar_url,
        birth,
        escolaridade,
        tipo_aula,
        materias,
        created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
    `
        
    const values = [
        data.name,
        data.avatar_url,
        date(data.birth).iso,
        data.escolaridade,
        data.tipo_aula,
        data.materias,
        date(Date.now()).iso
    ]

    db.query(query, values, function (err, results) {

        if (err) throw `Database error! ${err}` 
        
        callback (results.rows[0])
    })


    },

    show(id, callback) {
        
        db.query(`
            SELECT * 
            FROM teachers 
            WHERE id = $1`, [id], function(err,results) {

                if(err) throw `Database error! ${err}` 

                callback(results.rows[0])

                
            })

    },

    update(data, callback) {
        
        const query =
            `
        UPDATE teachers SET
            avatar_url = ($1),
            name = ($2),
            birth = ($3),
            escolaridade = ($4),
            tipo_aula = ($5),
            materias = ($6)

        WHERE id = ($7)
            `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.escolaridade,
            data.tipo_aula,
            data.materias,
            data.id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `Database error! ${err}` 

            callback()
        })
    },

    delete(id,callback) {

        db.query (` DELETE FROM teachers WHERE id = $1 `, [id] , function (err) {
            if (err) throw `Database error! ${err}` 
            
            return callback()
            })

    }

}