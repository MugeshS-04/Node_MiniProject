import db from '../../../models/index.js'
import { expect } from 'chai'

describe("getOrderDetails function", () => {

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
    
    it("should return order details!", async () => {
        
        const res = await db.orders.getOrderDetails(order.id, user.id)

        expect(res.user_id).to.equal(user.id)

    })

    it("should No records found", async () => {
        
        try{
            await db.orders.getOrderDetails(9999, user.id)
        }
        catch(error)
        {
            expect(error.message).to.deep.equal("No records found")
        }


    })

})