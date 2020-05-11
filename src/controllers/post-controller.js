import Post from '../models/post';

class PostController {
  constructor() {}

  async store(req, res) {
    // ('/users/posts')
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
    // ('/users/posts')
    const { id } = req.user;
    try {
      const posts = await Post.findAll({
        where: { user_id: id },
        include: { association: 'author' },
      });
      if (!posts) return res.status(400).json('Posts not found');
      return res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }

  async findOne(req, res) {
    // ('/users/posts/:id')
    const user_id = req.user.id;
    const { id } = req.params;
    try {
      const post = await Post.findOne({
        where: { id, user_id },
        include: { association: 'author' },
      });
      if (!post) return res.status(400).json('Post not found');
      return res.status(200).json(post);
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    // ('/users/posts/:id')
    const { id } = req.params;
    const { body } = req.body;
    const user_id = req.user.id;
    try {
      const post = await Post.findOne({ where: { id, user_id } });
      if (!post) return res.status(400).json('Post not found');
      await post.update({ body }, { where: id });
      return res.status(200).json(post);
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }

  async destroy(req, res) {
    // ('/users/posts:id')
    const { id } = req.params;
    const user_id = req.user.id;
    try {
      const post = await Post.findOne({
        where: { id, user_id },
      });
      if (!post) return res.status(400).json('Post not found');
      await post.destroy({ where: { id } });
      return res.sendStatus(204);
    } catch (error) {
      console.error(error);
      return res.status(412).json(error);
    }
  }
}

export default new PostController();
