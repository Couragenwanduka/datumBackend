export const capitalizeFirstLetter = (value, helpers) => {
    const regex = /^[A-Z]/;
    if (!regex.test(value)) {
      return helpers.error('any.invalid'); // Custom error message
    }
    return value; // Valid input
  };