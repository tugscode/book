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

module.exports = app