import BadRequest from './error.js';

const errorHandling = (err, req, res, next) => {
  // Check if the error is an instance of BadRequest
  if (err instanceof BadRequest) {
    return res.status(err.statusCode).json({
      message: err.message,
      success: false,
    });
  }

  // Handle validation errors (optional, if you use libraries like Joi or express-validator)
  if (err.isJoi) { // Example condition for Joi validation errors
    return res.status(400).json({
      message: 'Validation Error',
      details: err.details,
      success: false,
    });
  }
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: err.message, name: err.name, stack: err.stack, });
  }
  if (err instanceof TypeError) {
    // Check if the error object has a status of 400 and a 'body' property
    if (err.status === 400 && 'body' in err) {
      return res.status(400).json({
        message: err.message,
        name: err.name,
        stack: err.stack, // Be cautious with exposing stack traces in production
      });
    }
  }
  

  // Log the error for internal tracking (optional)
  console.error('Unhandled error:', err);

  // Handle other types of errors
  res.status(500).json({
    message: 'Internal Server Error',
    success: false,
  });
};

export default errorHandling;
