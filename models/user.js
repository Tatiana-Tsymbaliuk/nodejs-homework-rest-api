const {Schema, model} = require("mongoose");
// const { handleSaveError, handleUpdateValidate }  = require("./hooks");
const hendleMongooseError = require('../helpers/hendelMongooseError')

const Joi = require('joi');

const userSchema = new Schema({
        password: {
        type: String,
        required: [true, 'Password is required'],
        },
        email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        },
        subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
        },
        token: {
        type: String,
        },
        avatarURL: {
		type: String,
		required: true,
	 },
}, {versionKey: false, timestamps: true});

userSchema.post("save", hendleMongooseError );

const registerSchema = Joi.object({
        email: Joi.string().required().messages({"any.required": `missing required email field`}),
        password: Joi.string().required().messages({"any.required": `missing required password field`}),
});

const loginSchema = Joi.object({
        email: Joi.string().required().messages({"any.required": `missing required email field`}),
        password: Joi.string().required().messages({"any.required": `missing required password field`}),
});

const schemas = {
        registerSchema,
        loginSchema,
}
const User = model("user", userSchema);

module.exports = {
        User,
        schemas,
}