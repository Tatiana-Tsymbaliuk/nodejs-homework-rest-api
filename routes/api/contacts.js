
const express = require('express');
const ctrl = require('../../controllers/contacts')
const { validateBody, isValidFavorite, isValidId } = require('../../middleware')

const {schemas} = require('../../models/contact')
const router = express.Router()


router.get('/', ctrl.getAll);

router.get('/:id', isValidId, ctrl.getById);

router.post('/', validateBody(schemas.contactAddShema), ctrl.add);

router.delete('/:id', isValidId, ctrl.deleteById);

router.put('/:id', isValidId, validateBody(schemas.contactAddShema), ctrl.updeteById)


router.patch("/:id/favorite", isValidId, isValidFavorite(schemas.updateFavoriteSchema), ctrl.updateFavorite);


module.exports = router;

