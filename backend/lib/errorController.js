require('dotenv').config()
const debug = require('debug')(process.env.DEBUG)

module.exports.errorController = (error, req, res, next) => {
  try {
    if( error.name === 'ValidationError') {
      return error = handleValidationError(error, res)
    }
    if( error.code && error.code == 11000) {
      return error = handleDuplicateKeyError(error, res)
    }
  } catch(error) {
    res.status(500).send('An unknown error occured.')
  }
}

const handleDuplicateKeyError = (error, res) => {
  const field = Object.keys(error.keyValue)
  const code = 409;
  const errorMessage = `An account with ${field} already exists`

  res.status(code).json({messages: errorMessage, fields: field})
}

const handleValidationError = (error, res) => {
  let errors = Object.values(error.errors).map(el => el.message);
  let fields = Object.values(error.errors).map(el => el.path);
  let code = 400;

  if(errors.length > 1) {
     const formattedErrors = errors.join(' ');
     res.status(code).send({messages: formattedErrors, fields});
   } else {
      res.status(code).send({messages: errors, fields})
   }
}