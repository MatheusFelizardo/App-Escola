exports.age = function (timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
        const day = today.getDate() - birthDate.getDate()

        if (month<0 ||month == 0 && day < 0) {
            age = age -1
        }

        return age
        }

exports.graduation = function (escolaridade) {
        
        if (escolaridade == "medioCompleto") {
            escolaridade = "Ensino Médio Completo"
        }

        if (escolaridade == "superiorCompleto") {
            escolaridade = "Ensino Superior Completo"
        }

        if (escolaridade == "mestrado") {
            escolaridade = "Mestrado"
        }    

        if (escolaridade == "doutorado") {
            escolaridade = "Doutorado"
        }
        return escolaridade   
    }

exports.date = function (birth) {

    const date = new Date(birth)

    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)

    return (`${year}-${month}-${day}`)

}