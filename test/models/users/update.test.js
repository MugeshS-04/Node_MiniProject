import db from '../../../models/index.js'
import { expect } from 'chai'

describe("update function", () => {

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
    
    it("should return updation successfull!", async () => {
        
        const email = "abcd.s@rently.com"

        const data = {
            first_name : "Mdasdsad",
            last_name  : "Sasdasdad",
            age : 21,
            contact_number : "123456789asda"
        }

        const res = await db.users.updateUser(data, email)

        expect(res).to.equal(1);
    })

    it("should return data is empty", async () => {
        
        const email = "abcd.s@rently.com"

        const data = {}

        try{
            const res = await db.users.updateUser(data, email)
        }
        catch(error)
        {
            expect(error.message).to.equal("No valid fields to update");
        }

    })

    it("should return no records updated!", async () => {
        
        const email = "abcdasSASS.s@rently.com"

        const data = {
            first_name : "Mdasdsad",
            last_name  : "Sasdasdad",
            age : 21,
            contact_number : "123456789asda"
        }

        try{
            const res = await db.users.updateUser(data, email)
        }
        catch(error)
        {
            expect(error.message).to.equal("No records Updated!");
        }
    })
})