import User from '../models/user';

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
        return res.status(201).json({ message: 'Logado com sucesso!' });
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

    try {
      if ((username, password)) {
        const user = await User.findOne({ where: { username } });
        if (await User.isPassword(user.password, password)) {
          return res.status(200).json({ message: 'Logado com sucesso!' });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Login inválido!' });
    }
  }
}

export default new SessionController();
