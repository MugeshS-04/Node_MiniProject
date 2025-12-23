import db from '../../../models/index.js'
import { expect } from 'chai'

describe("UpdateOrderDetails function", () => {

    let user = {}
    let order = {}

    beforeEach(async() => {
        user = await db.users.create({         
            first_name: "ABCD",
            last_name: "EFG",
            age: 21,
            email: "abcd.s@rently.com",
            password: "ABCD123!",
            contact_number: "123456789"
        })

        order = await db.orders.create({  
            user_id: user.id,
            order_name: "2313131313",
            order_date: new Date(),
            amount: 212313,
            payment_method: "cash"
        })
    })

    afterEach(async () => {
        await db.orders.destroy({where : {user_id : user.id}})
        await db.users.destroy({where : {id : user.id}, force : true})
        
    })
    
    it("should return order updation successfull!", async () => {

        const orderdata = {
            id: order.id,
            products : [
                {product_id : 3, quantity : 4},
                {product_id : 1, quantity : 4},
                {product_id : 2, quantity : 4}
            ],
            payment_method: "cash"
        }
        
        const res = await db.orders.updateOrder(orderdata, user.id, 999999)

        expect(res).to.equal(1)

    })

    it("should return order updation successfull!", async () => {

        const orderdata = {
            id: 9999,
            products : [
                {product_id : 3, quantity : 4},
                {product_id : 1, quantity : 4},
                {product_id : 2, quantity : 4}
            ],
            payment_method: "cash"
        }

        try{
            await db.orders.updateOrder(orderdata, user.id, 999999)
        }
        catch(error)
        {
            expect(error.message).to.equal("No records Updated!")
        }

    })

})