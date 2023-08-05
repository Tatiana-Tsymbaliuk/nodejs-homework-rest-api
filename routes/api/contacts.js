
const express = require('express');
const ctrl = require('../../controllers/contacts')
const { validateBody, isValidFavorite, isValidId, authenticate } = require('../../middleware')

const {schemas} = require('../../models/contact')
const router = express.Router()


router.get('/', authenticate, ctrl.getAll);

router.get('/:id', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validateBody(schemas.contactAddShema), ctrl.add);

router.delete('/:id', authenticate, isValidId, ctrl.deleteById);

router.put('/:id', authenticate, isValidId, validateBody(schemas.contactAddShema), ctrl.updeteById)


router.patch("/:id/favorite", authenticate, isValidId, isValidFavorite(schemas.updateFavoriteSchema), ctrl.updateFavorite);


module.exports = router;

