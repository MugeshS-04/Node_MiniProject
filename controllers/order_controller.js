import db from "../models/index.js"

export const createOrder = async (req, res) => {
    try{
        const totalAmount = await db.products.totalAmount(req.body.products)
        const orderDetails = await db.orders.createorder(req.body, req.user.id, totalAmount)
        await db.order_product.createProduct(req.body.products, orderDetails.id)
        res.json({success: true, message: "Order created successfully", order_id : orderDetails.id})
    }
    catch(error)
    {
        res.json({success: false, message: error.message})
    }
}

export const updateOrder = async (req, res) => {
    try{
        const totalAmount = await db.products.totalAmount(req.body.products)
        await db.orders.updateOrder(req.body, req.user.id, totalAmount)
        await db.order_product.updateProduct(req.body.products,req.body.id)
        res.json({success : true, message : "Details Updated Successfully!"})
    }
    catch(error)
    {
        res.json({success: false, message: error.message})
    }
}

export const getOrderDetails = async (req, res) => {
    try{
        const orderDetails = await db.orders.getOrderDetails(req.body.id, req.user.id)
        const productDetails = await db.order_product.getProductDetails(req.body.id)
        res.json({ orderDetails : orderDetails, products : productDetails })
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

export const createProduct = async (req, res) => {
    try{
        
        res.json(orders)
    }
    catch(error)
    {
        res.json({success: false, message: error.message})
    }
}