const express = require("express");
const { json } = require("express/lib/response");
const res = require("express/lib/response");
const fs = require("fs");
const path = require("path");
const app = express();
const router = express.Router();
const { books } = require("../book.json");


//Хэрэглэгч номын систем рүү нэврэх бүрт санамсаргүй байдлаар 3 номыг харах
router.get("/random", (req, res) => {
  let a = [];
  var random = Math.floor(Math.random() * books.length);
  for (i = 0; i < 3; i++) {
    while (a.includes(random) > 0) {
      random = Math.floor(Math.random() * books.length);
    }
    a.push(books[random]);
  }
  res.send(a);
});

// Хамгийн сүүлээс эхэн хүртэл хэвлэгдсэн дарааллаар номын мэдээллийг авна
router.get("/sort", (req, res) => {
    let dates = books.sort((a, b) => {
        return new Date(b.published) - new Date(a.published); 
      })
    res.send(dates)
});

//номын сан дахь бүх зохиолчдын нэрийг авах
router.get("/names" , (req ,res)=>{
   names = books.map((j)=>{return j.author})
   res.send(names)
})

//бүх номын мэдээллийг авах
router.get("/books" , (req ,res)=>{
    res.send(books)
})

//ISBN дугаараар номын мэдээлэл буцаах
router.get("/book/:isbn" , (req ,res)=>{
    let isbn_id = req.params.isbn
    book = books.filter(book=>{
        return book.isbn === isbn_id
    })
    res.send(book)
})

//номын нэрээр хайлт хийх
router.get("/search" , (req ,res)=>{
    title = req.query.title
    result = books.filter(book=>{
        return book.title.toLocaleLowerCase().includes(title)
    })
    res.send(result)
})

//Хамгийн их хуудастай номын мэдээлэл авах
router.get("/maxpages" , (req , res)=>{
    pages = books.map((books)=>{return books.pages})
    maxPages = Math.max(...pages)
    maximumPages = books.filter(book=>{
        return book.pages == maxPages
    })
    res.send(maximumPages)
})

//Хамгийн бага хуудастай номын мэдээлэл авах
router.get("/minpages" , (req , res)=>{
    pages = books.map((books)=>{return books.pages})
    minPages = Math.min(...pages)
    minimumPages = books.filter(book=>{
        return book.pages == minPages
    })
    res.send(minimumPages)
})

//Хэвлэлийн компаниудыг жагсаан дор бүрнээ хэдэн ном бидэнд нийлүүлсэн талаарх мэдээлэл авах
router.get("/company" , (req , res)=>{
    publishers = books.map(book=>{
        return book.publisher
    })
    var count = {}
    publishers.forEach((i) => {count[i] = (count[i]||0) +1})
    res.send(count)
})

//book card аас card устгах

router.get("/deletebook/:isbn", (req,res)=>{
    let isbn = req.params.isbn
    updated_books = books.filter( book =>{
        return book.isbn !== isbn
    })
    let data = {"books": updated_books}
    fs.writeFileSync(path.join(__dirname, "../book.json"), JSON.stringify(data))
    res.send("Book deleted")
})

// .toISOString()
//book.json deer nom nemeh
router.post('/addbook', (req, res)=>{
    book =  req.body
    book.published = (new Date(book.published))
    book.pages = (book.pages);
    console.log(books.length)
    books.push(book)
    console.log(books.length)
    fs.writeFileSync(path.join(__dirname, "../book.json"), JSON.stringify({"books": books}))
    res.send({"message": "book added"})
})

module.exports = router;
