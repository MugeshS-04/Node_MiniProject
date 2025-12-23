import db from '../../../models/index.js'
import { expect } from 'chai'
import Sinon from 'sinon'

const sequelize = db.sequelize

describe("ConnectDB", async () => {
    it("Should return connection Successful", async () => {
        const res = await db.connectDB()
        expect(res).to.be.an("undefined")
    })

    it("Should return connection failed", async () => {
        Sinon.stub(sequelize, "authenticate").throws(new Error("Failed to connect to Database"))
        
        try{
            await db.connectDB()
        }
        catch(error)
        {
            expect(error.message).to.deep.equal("Failed to connect to Database")
        }
    })
})