import Joi from 'joi';

const UserSchema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().email({ tlds: { allow: false } }),
});
