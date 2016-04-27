import config from 'config';
import moment from 'moment';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import expressjwt from 'express-jwt';

const token = config.get('auth').token;

export function generateRandomPassword() {
  return crypto.randomBytes(20).toString('hex');
}

export function createJWT(user) {
  const payload = {
    userId: user.id,
    admin: user.admin,
    iat: moment().unix(),
    exp: moment().add(token.expire.value, token.expire.unit).unix(),
  };
  return jwt.sign(payload, token.secret);
}

function ensureAdmin(req, res, next) {
  if (!req.user || !req.user.admin) {
    return res.status(401).send({ message: 'You must be admin to access this resource' });
  }

  return next();
}

export const adminOnly = [expressjwt({ secret: token.secret }), ensureAdmin];
export const authNeeded = [expressjwt({ secret: token.secret })];
