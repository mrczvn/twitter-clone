import Post from '../models/post';

class PostController {
  constructor() {}

  async store(req, res) {
    const { body } = req.body;
    const { id } = req.user;
    try {
      const post = await Post.create({
        body,
        user_id: id,
      });
      return res.status(201).json(post);
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }

  async index(req, res) {
    const { id } = req.user;
    try {
      const posts = await Post.findAll({
        where: { user_id: id },
        include: { association: 'author' },
      });
      return res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }

  async findOne(req, res) {
    const user_id = req.user.id;
    const { id } = req.params;
    try {
      const post = await Post.findOne({
        where: { id, user_id },
        include: { association: 'author' },
      });
      return res.status(200).json(post);
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req.body;
    try {
      const post = await Post.update(
        { body },
        {
          where: { id },
        }
      );
      return res.status(200).json(post);
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    try {
      const post = await Post.destroy({ where: { id } });
      return res.sendStatus(204);
    } catch (error) {
      console.error(error);
      return res.status(412).json(error);
    }
  }
}

export default new PostController();
