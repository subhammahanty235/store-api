require('dotenv').config()
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const app = express();
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorhandlingMiddleware = require('./middleware/error-handler')

app.use(express.json())
app.use(cors())
// routes
app.get('/',(req,res)=>{
    res.send("<h1>Store Project</h1>")
})

app.use('/api/v1/products',require('./routes/products'))


app.use(notFound)
app.use(errorhandlingMiddleware)
const port = process.env.PORT || 5000
const uri = process.env.MONGO_URI
const start = async()=>{
    try {
        await connectDB(uri)
        app.listen(port , console.log("Started"))
    } catch (error) { 
        console.log(error)
    }
}

start();
