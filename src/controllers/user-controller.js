import User from '../models/user';
import Post from '../models/post';

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
    // ('/users')
    try {
      const users = await User.findAll({});
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }

  async findOne(req, res) {
    // ('/users')
    const { id, username, email } = req.user;
    try {
      return res.json({
        id,
        username,
        email,
      });
    } catch (error) {
      console.error(error);
      return res.status(404).json(error);
    }
  }

  async show(req, res) {
    // ('/posts')
    try {
      const posts = await Post.findAll({});
      if (!posts) return res.status(400).json('Posts not found');
      return res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    // ('/users')
    const { id } = req.user;
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
    // ('/users')
    const { id } = req.user;
    try {
      const user = await User.destroy({
        where: { id },
      });
      return res.sendStatus(204);
    } catch (error) {
      console.error(error);
      return res.status(412).json(error);
    }
  }
}

export default new UserController();
