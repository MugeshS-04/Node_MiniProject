import express from 'express'

import { createOrder, getOrderDetails, updateOrder, getOrders } from "../controller/order_controller.js"

const order_router = express.Router()

order_router.post("/createorder", createOrder)
order_router.post("/updateorder", updateOrder)

order_router.get("/getorderdetails", getOrderDetails)
order_router.get("/getorders", getOrders)

export default order_router