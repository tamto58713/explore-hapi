'use strict';

import Joi from '@hapi/joi';

const schemaRegister = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9 -_]{5,30}$/)
    .required(),
  userName: Joi.string()
    .alphanum()
    .min(6)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,30}$/)
    .required(),
  repeat_password: Joi.any()
    .equal(Joi.ref('password'))
    .required()
})

const schemaLogin = Joi.object({
  userName: Joi.string()
    .alphanum()
    .min(6)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,30}$/)
})

module.exports = {
  schemaRegister,
  schemaLogin
}