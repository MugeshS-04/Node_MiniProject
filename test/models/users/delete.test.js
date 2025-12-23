import db from '../../../models/index.js'
import { expect } from 'chai'

describe("delete function", () => {

    beforeEach(async() => {
        await db.users.create({         
            first_name: "ABCD",
            last_name: "EFG",
            age: 21,
            email: "abcd.s@rently.com",
            password: "ABCD123!",
            contact_number: "123456789"
        })
    })

    afterEach(async () => {
        await db.users.destroy({where : {email : "abcd.s@rently.com"}, force : true})
    })
    
    it("should return deletion successfull!", async () => {
        
        const data = "abcd.s@rently.com"

        const res = await db.users.deleteUser(data)

        expect(res).to.equal(1);
    })

    it("should return user doesn't exist", async () => {
        
        const data = "abcdefg.s@rently.com"

        try{
            const res = await db.users.deleteUser(data)
        }
        catch(error)
        {
            expect(error.message).to.equal("User doesn't Exists!");
        }

    })

})