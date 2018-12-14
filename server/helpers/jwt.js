import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SECRET || '123';

export const generateToken = data => jwt.sign(data, JWT_SECRET, { expiresIn: process.env.EXPIRED_LOGIN || '1d' });

export const verifyToken = token => new Promise((resolve, reject) => {
  if (!token) return reject(new Error('Token is null or expired'));
  return jwt.verify(token, JWT_SECRET, (err, decoded) => (err || !decoded) ? reject(err) : resolve(decoded));
});
