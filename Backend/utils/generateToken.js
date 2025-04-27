import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token and sets it as an HTTP-only cookie
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} userId - MongoDB user ID
 */
export const generateToken = (req, res, userId) => {
  const remember = req.body?.remember === true;
  const expiresIn = remember ? `${365 * 24}h` : '24h'; // 1 year or 1 day
  const maxAge = remember ? 365 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // secure only in production
    sameSite: 'strict',
    maxAge,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log(' JWT set in cookie for user:', userId);
  }
};
