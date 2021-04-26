const Joi = require("Joi")

    const schema = Joi.object({
        first_name: Joi.string().min(2).max(10).required(),
        last_name: Joi.string().min(2).max(10).required(),
        username: Joi.string().alphanum().min(3).max(10).required(),
        age: Joi.number().min(18).max(100).required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().min(6).max(1000).required(),
        repeat_password: Joi.ref("password")
    })
    
    const loginSchema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().min(6).max(1000).required()
    })

module.exports.schema = schema
module.exports.loginSchema = loginSchema