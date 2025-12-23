import db from '../../../models/index.js'
import { expect } from 'chai'

describe("updateproduct function", () => {

  let user, order
  let product = {}

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
    await db.order_product.destroy({ where: {order_id : order.id}})
    await db.orders.destroy({ where: {id: order.id}, force: true })
    await db.users.destroy({ where: {id: user.id}, force: true })
  })

  it("should return products updated successfully!", async () => {
    const products = [
      { product_id: 3, quantity: 4 },
      { product_id: 1, quantity: 4 },
      { product_id: 2, quantity: 4 }
    ]

    product = await db.order_product.updateProduct(products, order.id)

    expect(product.length).to.equal(3)
  })
})
