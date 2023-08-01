const {Schema, model} = require("mongoose");
// const { handleSaveError, handleUpdateValidate }  = require("./hooks");
const hendleMongooseError = require('../helpers/hendelMongooseError')

const Joi = require('joi');
const contactSchema = new Schema(
        {
                name: {
                  type: String,
                  required: [true, 'Set name for contact'],
                },
                email: {
                  type: String,
                },
                phone: {
                  type: String,
                },
                favorite: {
                  type: Boolean,
                  default: false,
                },
              }, {versionKey: false, timestamps: true}
);
// contactSchema.pre("findOneAndUpdate", handleUpdateValidate );

// contactSchema.post("findOneAndUpdate", handleSaveError );

contactSchema.post("save", hendleMongooseError );

const Contact = model("contact", contactSchema);

const contactAddShema = Joi.object({
        name: Joi.string().required().messages({"any.required": `missing required name field`}),
        email: Joi.string().required().messages({"any.required": `missing required email fiel`}),
        phone: Joi.string().required().messages({"any.required": `missing required phone fiel`}),
        favorite: Joi.boolean().messages(),
});

  const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required().messages({
		"any.required": `missing required favorite field`
	})
 });

const schemas = {
        contactAddShema, 
        updateFavoriteSchema,  
};

module.exports = {
        Contact,
        schemas,
}