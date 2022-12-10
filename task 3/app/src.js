const express = require("express")
const path = require("path")
const hbs = require("hbs")
const app = express()

app.use(express.static(path.join(__dirname, "../clientSide/public")))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "../clientSide/views"))
hbs.registerPartials(path.join(__dirname, "../clientSide/layouts"))

app.use(express.urlencoded({ extended: true }))

const bookRoutes = require("./routes/books.routes")
app.use(bookRoutes)

app.all('*', (req, res) => res.render('err404', {
    pageTitle: "Page Not Found",
    err: "invalid url please try again"
}))

module.exports = app