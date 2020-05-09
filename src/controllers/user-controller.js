import User from '../models/user';

class UserController {
  constructor() {}

  async store(req, res) {
    const { id, username, email, password } = req.body;
    try {
      const user = await User.create({
        id,
        username,
        email,
        password,
      });
      return res.status(201).json(user);
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

  async findOne(req, res) {
    const id = req.params;
    try {
      const user = await User.findOne({ where: id });
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(404).json(error);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
      const user = await User.update(
        { username, email, password },
        {
          where: { id },
        }
      );
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(412).json(error);
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    try {
      const user = await User.destroy({ where: { id } });
      return res.sendStatus(204);
    } catch (error) {
      console.error(error);
      return res.status(412).json(error);
    }
  }
}

export default new UserController();
