const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const api = require("./server/routes/api")

const app = express()
app.use(express.static(path.join(__dirname, "dist")))
app.use(express.static(path.join(__dirname, "node_modules")))
app.use(bodyParser.join())
app.use(bodyParser.urlencoded({extended: false}))

app.use("/", api)

const port = 1234
app.listen(port, function () {
    console.log(`Server running on port: ${port}`)
})