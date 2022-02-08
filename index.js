const express = require("express")
const apiRoutes = require('./routes/api.js')
const adminRoutes = require('./routes/admin.js')
const app = express();
const cors = require("cors")
const port = 3002

app.use(express.json())
app.use(express.static("public"))

app.use("/api" , apiRoutes)
app.use("/" , adminRoutes)

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`);
  });