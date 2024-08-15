import crypto from 'crypto';

export const generateId = () => {
  const customId = crypto.randomBytes(3).toString('hex'); // 3 bytes = 6 hex characters
  const id = parseInt(customId, 16); // Parse as a base-16 (hex) number
  return id;
};
