
const express = require('express');
const ctrl = require('../../controllers/contacts')
const { validateBody} = require('../../middleware')
const schemas = require('../../schemas/contacts')
const router = express.Router()


router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validateBody(schemas.contactAddShema), ctrl.add);

router.delete('/:contactId', ctrl.deleteById);

router.put('/:contactId', validateBody(schemas.contactAddShema), ctrl.updeteById)


module.exports = router

