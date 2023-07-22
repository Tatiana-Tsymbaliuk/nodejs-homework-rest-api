const contactsService = require("../../models/contacts");
const express = require('express');
const {HttpError} = require('../../helpers')
const Joi = require('joi');

const router = express.Router()

const contactAddShema = Joi.object({
  name: Joi.string().required().messages({"any.required": `missing required name field`}),
  email: Joi.string().required().messages({"any.required": `missing required email fiel`}),
  phone: Joi.string().required().messages({"any.required": `missing required phone fiel`}),
})

router.get('/', async (req, res, next) => {
  try{
  const result = await contactsService.listContacts();
  res.json(result);
}
  catch(error){
  next(error);
  } 
})

router.get('/:contactId', async (req, res, next) => {
  try{
    const {contactId} = req.params;
    const result = await contactsService.getContactById(contactId)
    if (!result){
      // const error = new Error(`Contact with ${contactId} not found`);
      // error.status = 404;
      throw HttpError(404, `Not found` );
    }
    res.json(result);
  }
    catch(error){
    next(error); 
  } 
})

router.post('/', async (req, res, next) => {
  try{
    const {error} = contactAddShema.validate(req.body);
    if(error){
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  }
  catch(error){
    next(error); 
  }
})

router.delete('/:contactId', async (req, res, next) => {
 try{
const {contactId} = req.params;
const result = await contactsService.removeContact(contactId);
if (!result){
  throw HttpError(404, `Not found` );
}
res.json({
  message: "contact deleted"
});
 }
 catch(error){
  next(error);
 }
})

router.put('/:contactId', async (req, res, next) => {
  try{
    const {error} = contactAddShema.validate(req.body);
    if(error){
      throw HttpError(400, error.message );
    }
    const {contactId} = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
    if (!result){
      throw HttpError(404, `Not found` );
    }
    res.json(result);
  }
  catch(error){
    next(error); 
  }
})

module.exports = router
