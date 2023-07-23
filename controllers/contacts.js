const contactsService = require("../models/contacts");
const {HttpError, ctrlWrapper} = require('../helpers')


const getAll = async (req, res) => {
        const result = await contactsService.listContacts();
        res.json(result);
      }
const getById = async (req, res) => {
          const {contactId} = req.params;
          const result = await contactsService.getContactById(contactId)
          if (!result){
            throw HttpError(404, `Not found` );
          }
          res.json(result);
      }
const add = async (req, res) => {
          const result = await contactsService.addContact(req.body);
          res.status(201).json(result);
      }
const deleteById = async (req, res) => {
       const {contactId} = req.params;
       const result = await contactsService.removeContact(contactId);
       if (!result){
         throw HttpError(404, `Not found` );
       }
       res.json({
         message: "contact deleted"
       });
       }
const updeteById = async (req, res) => {
        if (Object.keys(req.body).length === 0) {
        throw HttpError(400, "missing fields");
              }
          const {contactId} = req.params;
          const result = await contactsService.updateContact(contactId, req.body);
          if (!result){
            throw HttpError(404, `Not found` );
          }
          res.json(result);
      }

module.exports = {
        getAll: ctrlWrapper(getAll),
        getById: ctrlWrapper(getById),
        add: ctrlWrapper(add),
        deleteById: ctrlWrapper(deleteById),
        updeteById: ctrlWrapper(updeteById),
}

