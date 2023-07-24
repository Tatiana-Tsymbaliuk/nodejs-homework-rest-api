const {HttpError} = require('../helpers');

const validateBody = (shema )=> {
        const func = (req, res, next)=>{
                const { error }=shema.validate(req.body);
                if (Object.keys(req.body).length === 0) {
                        throw HttpError(400, "missing fields");
                      } else if(error){
                        next(HttpError(400, error.message))
                }
                next()
        }
        return func;
}

module.exports = validateBody; 
