const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./Router/user')
const brandRouter = require('./Router/brand')
const categoryRouter = require('./Router/category')

const app = express()

 
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors({
    origin:'*'
}))
app.use(userRouter)
app.use(brandRouter)
app.use(categoryRouter)




app.listen(port , ()=>{
    console.log('server is up on port' + port)
})