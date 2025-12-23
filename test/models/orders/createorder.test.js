import db from '../../../models/index.js'
import { expect } from 'chai'

describe("createOrder function", () => {

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
    })
    
    afterEach(async () => {
        await db.orders.destroy({where: {id : order.id}})
        await db.users.destroy({where : {id: user.id}, force : true})
    })
    
    it("should return order created successfully!", async () => {
        
        const data = {
            products : [
                {product_id : 3, quantity : 4},
                {product_id : 1, quantity : 4},
                {product_id : 2, quantity : 4}
            ],
            payment_method: "cash"
        }
    
        
        order = await db.orders.createorder(data, user.id, 9999)
        
        expect(order.user_id).to.deep.equal(user.id)
        
    })

})