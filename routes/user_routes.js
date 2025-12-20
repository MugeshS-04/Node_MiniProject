import express from 'express'

import { register, login, update } from "../controllers/user_controller.js"
import { access_verify, refresh_verify } from "../helpers/token.js"

const user_router = express.Router()

user_router.post("/register", register)
user_router.post("/login", login)
user_router.post("/update", access_verify, update)

user_router.post("/refresh", refresh_verify)

export default user_router