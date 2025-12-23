import sinon from 'sinon'
import db from '../../../models/index.js'
import bcrypt from 'bcrypt'
import { expect } from 'chai'

describe("login function", () => {

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

    afterEach(() => sinon.restore())
    
    it("should return login successfull!", async () => {
    
        const data = {
            email: "abcd.s@rently.com",
            password: "ABCD123!"
        }

        sinon.stub(bcrypt, "compare").resolves(true)
        
        const res = await db.users.login(data)

        expect(res.email).to.equal(data.email);
    })

    it("should return password is incorrect", async () => {
        const data = {
            email: "abcd.s@rently.com",
            password: "ABCD123!"
        }

        sinon.stub(bcrypt, "compare").resolves(false)
        
        try{
            const res = await db.users.login(data)
        }
        catch(error)
        {
            expect(error.message).to.equal("Incorrect Password");
        }

    })

    it("should return email doesn't exist", async () => {
        const data = {
            email: "abcdefg.s@rently.com",
            password: "ABCD123!"
        }
        
        try{
            await db.users.login(data)
        }
        catch(error)
        {
            expect(error.message).to.equal("User doesn't Exists!");
        }
    })
})