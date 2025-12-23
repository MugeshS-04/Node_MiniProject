import db from '../../../models/index.js'
import { expect } from 'chai'

describe("total amount function", () => {

    let user, order

    beforeEach(async () => {
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
        await db.orders.destroy({ where: {id: order.id}, force: true })
        await db.users.destroy({ where: {id: user.id}, force: true })
    })
    
    it("should return total amount!", async () => {
    
        const products = [
            { product_id: 3, quantity: 4 },
            { product_id: 1, quantity: 4 },
            { product_id: 2, quantity: 4 }
        ]   
        
        const res = await db.products.totalAmount(products)

        expect(res).to.equal(2160);
    })

})