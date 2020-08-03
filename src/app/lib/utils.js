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

exports.serie = function (escolaridade) {                
        
        if (escolaridade == "quintoF") {
            escolaridade = "5º Ano do Ensino Fundamental"
        }

        if (escolaridade == "sextoF") {
            escolaridade = "6º Ano do Ensino Fundamental"
        } 
        if (escolaridade == "setimoF") {
            escolaridade = "7º Ano do Ensino Fundamental"
        } 
        if (escolaridade == "oitavoF") {
            escolaridade = "8º Ano do Ensino Fundamental"
        } 
        if (escolaridade == "nonoF") {
            escolaridade = "9º Ano do Ensino Fundamental"
        } 
        if (escolaridade == "primeiroM") {
            escolaridade = "1º Ano do Ensino Médio"
        }
        if (escolaridade == "segundoM") {
            escolaridade = "2º Ano do Ensino Médio"
        }
        if (escolaridade == "terceiroM") {
            escolaridade = "3º Ano do Ensino Médio"
        }

        return escolaridade   
    }

exports.date = function (birth) {

    const date = new Date(birth)

    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)

    return {
        birthDay:  `${day}/${month}`,
        iso: `${year}-${month}-${day}`,
        created_at: `${day}/${month}/${year}`
    }

}