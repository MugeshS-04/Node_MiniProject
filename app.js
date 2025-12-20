import express from 'express'
import dotenv from 'dotenv'
import { errors } from 'celebrate'
import user_router from './routes/user_routes.js'
import order_router from './routes/order_routes.js'

dotenv.config({quiet: true})

const app = express()
app.use(express.urlencoded())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("<h1>API is Working!!!</h1>")
})

app.use("/user", user_router)
app.use("/order", order_router)

app.use(errors())

export default app