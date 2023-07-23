const Joi = require('joi');

const contactAddShema = Joi.object({
        name: Joi.string().required().messages({"any.required": `missing required name field`}),
        email: Joi.string().required().messages({"any.required": `missing required email fiel`}),
        phone: Joi.string().required().messages({"any.required": `missing required phone fiel`}),
      });

module.exports = {
        contactAddShema,    
}