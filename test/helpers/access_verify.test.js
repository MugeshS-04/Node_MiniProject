import sinon from 'sinon'
import { access_verify } from '../../helpers/token.js'
import { expect } from 'chai'
import jwt from 'jsonwebtoken'

describe("access_token", () => {
    afterEach(() => sinon.restore())

    it("access_token verified", async () => {
        const req = {
            headers: {
                authorization : "Bearer 123123123"
            }
        }

        const next = sinon.stub()

        const res = {
            json: sinon.stub()
        }

        sinon.stub(jwt, 'verify').returns({})

        await access_verify(req, res, next)

        expect(next.calledOnce).to.be.true
    })

    it("verification failed", async () => {
        const req = {
            headers: {
                authorization : "Bearer 123123123"
            }
        }

        const res = {
            json : sinon.stub()
        }

        const next = sinon.stub()

        sinon.stub(jwt, 'verify').throws(new Error())

        try{
            await access_verify(req, res, next)
        }
        catch(error)
        {
            expect(next.calledOnce).to.be.false
        }

    })
})
