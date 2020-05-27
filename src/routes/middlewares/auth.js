import { promisify } from 'util';
import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json('É necessario uma forma de autenticação');

  try {
    const [, token] = authorization.split(' ');
    const decoded = await promisify(jwt.verify)(token, 'secret');

    req.doctorId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json('Token inválido');
  }
};
