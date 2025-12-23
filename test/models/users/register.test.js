import sinon from 'sinon'
import db from '../../../models/index.js'
import { expect } from 'chai'

describe("register function", () => {

    after(async () => {
        await db.users.destroy({where : {email : "abcd.s@rently.com"}, force : true})
    })

    afterEach(() => sinon.restore())
    
    it("should return register successfull!", async () => {
        
        const data = {         
            first_name: "ABCD",
            last_name: "EFG",
            age: 21,
            email: "abcd.s@rently.com",
            password: "ABCD123!",
            contact_number: "123456789"
        }
        
        const res = await db.users.register(data)

        expect(res.email).to.equal(data.email);
    })

    it("should return user already exist", async () => {
        
        const data = {         
            first_name: "ABCD",
            last_name: "EFG",
            age: 21,
            email: "abcd.s@rently.com",
            password: "ABCD123!",
            contact_number: "123456789"
        }
        
        try{
            const res = await db.users.register(data)
        }
        catch(error)
        {
            expect(error.message).to.equal("User already Exists!");
        }

    })

})