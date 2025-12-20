import db from "../models/index.js"

export const createOrder = async (req, res) => {
    try{
        const order = req.body
        order.user_id = req.user.id
        console.log(order.user_id)
        const orderDetails = await db.orders.createorder(order)
        res.json({success: true, message: "Order created successfully", order_id : orderDetails.id})
    }
    catch(error)
    {
        res.json({success: false, message: error.message})
    }
}

export const updateOrder = (req, res) => {
    try{

    }
    catch(error)
    {
        res.json({success: false, message: error.message})
    }
}

export const getOrderDetails = (req, res) => {
    try{

    }
    catch(error)
    {
        res.json({success: false, message: error.message})
    }
}

export const getallOrders = (req, res) => {
    try{

    }
    catch(error)
    {
        res.json({success: false, message: error.message})
    }
}