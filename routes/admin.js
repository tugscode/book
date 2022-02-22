const express = require("express");
const path = require('path')
const app = express();

const {books} = require('../book.json')

app.set("view engine" , "ejs")
app.set("views" , path.join(__dirname , "../views"))
app.set("view options" , {layout: false})

app.use("/books" , (req , res)=>{
    res.render("books" , {books})
})


app.get("/" , (req, res)=>{
    res.render("index")
})

app.get("/reset", async (req,res)=>{
    await fs.writeFile(path.join(__dirname, "../book.json"), JSON.stringify(books_default), async err =>{
    if(err){
      res.send("Error occured white updating book.json.: " + err)
    }
     res.redirect('/')
  })
  
})

module.exports = app