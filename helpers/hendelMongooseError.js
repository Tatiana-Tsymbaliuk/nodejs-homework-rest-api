const handleMongooseError = (error, data, next) => {
	error.status = 400;
	next()
};

module.exports =  handleMongooseError ;

// const handleUpdateValidate = function(next){
//         this.options.runValidators = true;
//         next();
// }

