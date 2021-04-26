const express = require("express")
const app = express()
const mongoose = require ("mongoose")
const cors = require("cors")
require('dotenv').config()
// Import routes
const route = require("./controllers/auth")



//Connection to MongoDB

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection
connection.once("open", () => {
    console.log("Connected to your DB")
})

app.use(cors())
//Middleware 
app.use(express.json())
// Converting received data into json
app.use(express.urlencoded({extended:true}))
// Route Middlewares
app.use("/api/user", route)


app.listen(3000, () => console.log("Server is running.."))