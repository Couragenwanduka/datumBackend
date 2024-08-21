import BadRequest from './error.js';

const errorHandling = (err, req, res, next) => {
  // Handle custom BadRequest errors
  if (err instanceof BadRequest) {
    return res.status(err.statusCode).json({
      message: err.message,
      success: false,
    });
  }

  // Handle validation errors (e.g., from Joi or express-validator)
  if (err.isJoi) {
    return res.status(400).json({
      message: 'Validation Error',
      details: err.details,
      success: false,
    });
  }

  // Handle syntax errors in JSON parsing
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: err.message,
      name: err.name,
      stack: err.stack,
    });
  }

  // Handle TypeErrors specifically for bad requests
  if (err instanceof TypeError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: err.message,
      name: err.name,
      stack: err.stack,
    });
  }

  // Handle database connection errors
  if (err.message.includes("Can't reach database server")) {
    console.error("Database connection error:", err.message);
    return res.status(503).json({
      message: "Unable to connect to the database. Please check your connection and try again.",
      success: false,
    });
  }

  // Log any unhandled errors for internal tracking
  console.error('Unhandled error:', err);

  // Default to 500 Internal Server Error for other types of errors
  res.status(500).json({
    message: 'Internal Server Error',
    success: false,
  });
};

export default errorHandling;
