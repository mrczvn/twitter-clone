import Comment from '../models/comments';

class CommentController {
  constructor() {}

  async store(req, res) {
    // ('/:id/comments')
    const post_id = req.params.id;
    const user_id = req.user.id;
    const { body } = req.body;
    try {
      const comment = await Comment.create({
        body,
        user_id,
        post_id,
      });
      return res.status(201).json(comment);
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }

  async index(req, res) {
    // ('/:id/comments')
    const user_id = req.user.id;
    const post_id = req.params.id;
    try {
      const comments = await Comment.findAll({
        where: { user_id, post_id },
        include: [{ association: 'owner' }, { association: 'post' }],
      });
      if (!comments) return res.status(400).json('Comment not found');
      return res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }

  async findOne(req, res) {
    // ('/:post_id/comments/:comment_id')
    const user_id = req.user.id;
    const id = req.params.comment_id;
    const { post_id } = req.params;

    try {
      const comment = await Comment.findOne({
        where: { id, user_id, post_id },
        include: [{ association: 'owner' }, { association: 'post' }],
      });
      if (!comment) return res.status(400).json('Comment not found');
      return res.status(200).json(comment);
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    // ('/:post_id/comments/:comment_id')
    const user_id = req.user.id;
    const id = req.params.comment_id;
    const { post_id } = req.params;
    const { body } = req.body;
    try {
      const comment = await Comment.findOne({
        where: { id, post_id, user_id },
      });
      if (!comment) return res.status(400).json('Comment not found');
      await comment.update(
        { body },
        {
          where: { id },
        }
      );
      return res.status(200).json(comment);
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }

  async destroy(req, res) {
    // ('/:post_id/comments/:comment_id')
    const user_id = req.user.id;
    const id = req.params.comment_id;
    const { post_id } = req.params;
    try {
      const comment = await Comment.findOne({
        where: { id, post_id, user_id },
      });
      if (!comment) return res.status(400).json('Comment not found');
      await comment.destroy({ where: { id } });
      return res.sendStatus(204);
    } catch (error) {
      console.error(error);
      return res.status(412).json(error);
    }
  }
}

export default new CommentController();
