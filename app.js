const express = require("express")
const mongoose = require("mongoose")
const ejs = require("ejs")
const fileUpload = require("express-fileupload")
const methodOverride = require("method-override")
const pageControllers = require("./controllers/pageControllers")
const photoController = require("./controllers/photoControllers")

const app = express()

//Template Motoru
app.set("view engine", "ejs")

//Veritabanı Bağlantısı
mongoose.connect("mongodb://localhost/FreelancerDB")

//Middleware
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload())
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
)

//Route
app.get("/add", pageControllers.getAddPage)
app.get("/", photoController.getAllPhotos)
app.get("/photos/:id", photoController.getPhoto)
app.post("/photos", photoController.createPhoto)
app.put("/photos/:id", photoController.updatePhoto)
app.delete("/photos/:id", photoController.deletePhoto)
app.get("/photos/edit/:id", pageControllers.getEditPage)

const port = 3000

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışmaya başladı.`)
})
