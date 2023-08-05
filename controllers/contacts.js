
const { Contact } = require('../models/contact');
const { ctrlWrapper, HttpError } = require('../helpers');



const getAll = async (req, res) => {
        const {_id: owner} = req.user;
        const {page = 1, limit = 10} = req.query
        const skip = (page-1) * limit;
        const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email password");
        res.json(result);
      }
const getById = async (req, res) => {
          const { id } = req.params;
          const result = await Contact.findById(id)
          if (!result){
            throw HttpError(404, `Not found` );
          }
          res.json(result);
      }
const add = async (req, res) => {
      const {_id: owner} = req.user;
      const result = await Contact.create({...req.body, owner});
      res.status(201).json(result);
      }
const deleteById = async (req, res) => {
       const {id} = req.params;
       const result = await Contact.findByIdAndDelete(id);
       if (!result){
         throw HttpError(404, `Not found` );
       }
       res.json({
        mesage: "Delete success",
      });
       }
const updeteById = async (req, res) => {
        if (Object.keys(req.body).length === 0) {
        throw HttpError(400, `missing fields`);
              }
          const { id } = req.params;
          const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
          if (!result){
            throw HttpError(404, `Not found` );
          }
          res.json(result);
      }

const updateFavorite = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
  throw HttpError(400, `missing field favorite`);
        }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
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
        updateFavorite: ctrlWrapper(updateFavorite),
}

