let buttons = document.getElementsByClassName("dButton")
for(i = 0 ; i < buttons.length ; i ++){
    buttons[i].addEventListener("click" , deleteHandler)
}
function deleteHandler(e){
    let id = this.id
    fetch(`http://localhost:3002/api/deletebook/${id}`)
    .then(response => response.text())
    .then(data=>{
        alert("Press OK to delete")
        window.location.reload()
    })
}