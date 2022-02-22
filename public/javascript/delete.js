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

// // reset books list to default list
// document.getElementById("reset-btn").addEventListener('click', (event)=>{
//     event.preventDefault();
//     fetch('http://localhost:3002/reset')
//     .then(response =>{
//         return response
//     })
//     .then(response => {
//         alert("Books list is set to default")
//         location.reload()
//     })
// })