import User from '../models/user';
import jwt, { sign } from 'jsonwebtoken';

import config from '../config/auth';

class SessionController {
  constructor() {}

  async signUp(req, res) {
    const { username, email, password } = req.body;
    try {
      const [user, created] = await User.findOrCreate({
        where: { email, username },
        defaults: {
          username,
          email,
          password,
        },
      });
      if (created === false) {
        return res.status(400).json({ message: 'Usuário já existe!' });
      } else {
        return res.status(201).json({
          token: jwt.sign({ id: user.id }, config.secret, { expiresIn: '1h' }),
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Login inválido!' });
    }
  }

  async signIn(req, res) {
    const [, hash] = req.headers.authorization.split(' ');
    const [username, password] = Buffer.from(hash, 'base64')
      .toString()
      .split(':');

    if ((username, password)) {
      try {
        const user = await User.findOne({ where: { username } });
        if (await User.isPassword(user.password, password)) {
          return res.status(200).json({
            token: sign({ id: user.id }, config.secret, { expiresIn: '1h' }),
          });
        }
        return res.status(401).json({ message: 'Login inválido!' });
      } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Login inválido!' });
      }
    }
  }
}

export default new SessionController();
