const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config()
const source = process.env.MONGO_URI
const userRoutes = require("./controllers/controller")

const PORT = process.env.PORT || 5001
app.listen(PORT, ()=> {
    console.log(`Connected to ${PORT}`)
})

app.use(cors())
app.use(express.json())
app.use("/", userRoutes)

mongoose.connect(source, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection
connection.once("open", () => {
    console.log("We are connected! yay!")
})

