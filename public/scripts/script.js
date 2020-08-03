const currentPage = location.pathname
const menuItems = document.querySelectorAll ("header .links a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add ("active")
    }
}


const excluir = document.querySelector("#delete")

excluir.addEventListener("click", function(event){
    const confirmar = confirm (`Atenção!! Todos os dados serão perdidos.
Tem certeza que deseja excluir?`) 
   
    if(!confirmar) { event.preventDefault()}

})