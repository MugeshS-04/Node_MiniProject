import db from '../../../models/index.js'
import sinon from 'sinon'
import { expect } from 'chai'

const sequelize = db.sequelize

describe("ConnectDB", async () => {
    it("Should return connection failed", async () => {
        //sinon.stub(sequelize, "authenticate").throws(new Error())

        try{
            await db.connectDB()
        }
        catch(error)
        {
            expect(error).to.deep.equal("Failed to connect to Database")
        }
    })
})