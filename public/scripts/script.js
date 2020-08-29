const currentPage = location.pathname
const menuItems = document.querySelectorAll ("header .links a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add ("active")
    }
}

// SCRIPT PARA CONFIRMAR SE DESEJA DELETAR!

let excluir = document.querySelector("#delete")

function deleteConfirmation (event) {
    const confirmar = confirm (`Atenção!! Todos os dados serão perdidos.
    Tem certeza que deseja excluir?`) 
       
        if(!confirmar){ event.preventDefault()}
}

if (excluir) {
    excluir.addEventListener("click", deleteConfirmation)
}

// SCRIPT PARA PAGINAÇÃO
//[1,2,...,12,13,14,...,45,46]
// (ex.: 1, 2, 3 (sem reticências), 4, 5 (selecionada), 6, ...(pags 7 e 8), 9, 10

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndLastPages = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPages = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPages = currentPage >= selectedPage - 2

        if (firstAndLastPages || pagesBeforeSelectedPages && pagesAfterSelectedPages) {

            if (oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }

            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
    }

    return pages
}

const pagination = document.querySelector(".pagination")
const filter = pagination.dataset.filter
const page = +pagination.dataset.page
const total = +pagination.dataset.total 

const pages = paginate(page, total)

let elements = ""



for (let page of pages) {
    if (String(page).includes("...")) {
        elements +=`<span>${page}</span>`

    } else {
        if(filter) {
            elements +=`<a href="?page=${page}&filter=${filter}">${page}</a>`
        }else {
            elements +=`<a href="?page=${page}">${page}</a>`
        }
    }
}

pagination.innerHTML = elements
