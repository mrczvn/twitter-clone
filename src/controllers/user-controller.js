import User from '../models/user';

class UserController {
  constructor() {}

  async store(req, res) {
    const { username, email, password } = req.body;
    try {
      const user = await User.create({
        username,
        email,
        password,
      });
      return res.status(201).json({ result: user });
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({});
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }
}

export default new UserController();
