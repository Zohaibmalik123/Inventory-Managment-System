const express = require('express')
require('./db/mongoose')
const userRouter = require('./Router/user')

const app = express()
 
const port = process.env.PORT || 8000

app.use(express.json())
app.use(userRouter)



app.listen(port , ()=>{
    console.log('server is up on port' + port)
})