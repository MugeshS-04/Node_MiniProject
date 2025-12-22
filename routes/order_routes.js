import express from 'express'

import { createOrder, getOrderDetails, updateOrder, getallOrders } from "../controllers/order_controller.js"
import { access_verify } from "../helpers/token.js"

const order_router = express.Router()

order_router.post("/createorder", access_verify, createOrder)
order_router.post("/updateorder", access_verify, updateOrder)

order_router.get("/getorderdetails", access_verify, getOrderDetails)
order_router.get("/getallorders", access_verify, getallOrders)

export default order_router