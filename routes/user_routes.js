import express from 'express'

import { register, login, update, deleteUser, refresh } from "../controllers/user_controller.js"
import { access_verify, refresh_verify } from "../helpers/token.js"
import { celebrate, Joi } from 'celebrate'

const user_router = express.Router()

user_router.post("/register", celebrate({
    body : Joi.object({
        first_name: Joi.string().required(),
        last_name : Joi.string(),
        age: Joi.number().integer().min(16).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        contact_number: Joi.string()
    })
}), register)

user_router.post("/login", celebrate({
    body : Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    })
}), login)

user_router.post("/update", celebrate({
    body : Joi.object({
        first_name: Joi.string(),
        last_name : Joi.string(),
        age: Joi.number().integer().min(16),
        contact_number: Joi.string()
    }).unknown(false)
}), access_verify, update)

user_router.post("/delete", access_verify, deleteUser)

user_router.post("/refresh", refresh_verify, refresh)

export default user_router