import express from 'express'

import { createOrder, getOrderDetails, updateOrder, getallOrders, createProduct } from "../controllers/order_controller.js"
import { access_verify } from "../helpers/token.js"
import { celebrate, Joi } from 'celebrate'

const order_router = express.Router()

order_router.post("/createorder", celebrate({
    body : Joi.object({
        order_name: Joi.string(),
        products: Joi.array(),
        payment_method: Joi.string()
    })
}), access_verify, createOrder)

order_router.post("/updateorder", celebrate({
    body : Joi.object({
        id: Joi.number().required(),
        order_name: Joi.string(),
        products: Joi.array(),
        payment_method: Joi.string()
    })
}), access_verify, updateOrder)

order_router.get("/getorderdetails", access_verify, getOrderDetails)
order_router.get("/getallorders", access_verify, getallOrders)

export default order_router