const express = require("express")
const bodyParser = require("body-parser")
const expHandleBars = require("express-handlebars")
const path = require("path")
const nodemailer = require("nodemailer")


const app = express();

app.get("/", (req, res) => {
  res.send("hello")

})

app.use('/public', express.static(path.join(__dirname, 'public')))

app.engine('handlebars', expHandleBars())
app.set('viewEngine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(8000, () => {
  console.log("listening on 8k")
})