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

export const updateOrder = async (req, res) => {
    try{
        await db.orders.updateOrder(req.body, req.user.id)
        res.json({success : true, message : "Details Updated Successfully!"})
    }
    catch(error)
    {
        res.json({success: false, message: error.message})
    }
}

export const getOrderDetails = async (req, res) => {
    try{
        const orderDetails = await db.orders.getOrderDetails(req.body, req.user.id)
        res.json(orderDetails)
    }
    catch(error)
    {
        res.json({success: false, message: error.message})
    }
}

export const getallOrders = async (req, res) => {
    try{
        const orders = await db.orders.getallOrders(req.user.id)
        res.json(orders)
    }
    catch(error)
    {
        res.json({success: false, message: error.message})
    }
}