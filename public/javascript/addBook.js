document.getElementById('add-form').addEventListener('submit', formHandler)

function formHandler(event){
    event.preventDefault()
    book ={
        "isbn" : event.target.value,
        "subtitle" : event.target.value,
        "author" : event.target.value,
        "title" : event.target.value,
        "published" : event.target.value,
        "publisher" : event.target.value,
        "pages": event.target.value,
        "website" : event.target.value,
        "description" : event.target.value,
        "img" : event.target.value
    }
    fetch('http://localhost:3002/api/addbook' , {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
    .then(response=>{
        if(response.ok) return response.json()
        else throw new Error("status code: " + response.status)
    })
    .then(data=>{
        console.log("success: ", data)
    })
    .catch((error)=>{
        alert(error)
    })
}