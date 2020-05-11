import SessionController from './controllers/session-controller';
import Users from './controllers/user-controller';
import Posts from './controllers/post-controller';
import Comments from './controllers/comment-controller';

export default (app, auth) => {
  // SIGNUP DE UM USER
  app.post('/signup', SessionController.signUp);

  // SIGNIN DE UM USER
  app.get('/signin', SessionController.signIn);

  app
    .route('/users')
    .all(auth.authenticate())
    // DELETA O USER LOGADO
    .delete(Users.destroy)
    // EDITA O USER LOGADO
    .put(Users.update)
    // RETORNA DADOS DO USER LOGADO
    .get(Users.findOne);

  app
    .route('/users/posts')
    .all(auth.authenticate())
    // USER LOGADO CRIA UM POST
    .post(Posts.store)
    // USER LOGADO VÊ TODOS OS SEUS POSTS
    .get(Posts.index);

  app
    .route('/users/posts/:id')
    .all(auth.authenticate())
    // USER LOGADO DELETA UM POST
    .delete(Posts.destroy)
    // USER LOGADO EDITA UM POST
    .put(Posts.update)
    // USER LOGADO VÊ UM POST ESPECÍFICO
    .get(Posts.findOne);

  // USER LOGADO VÊ POSTS DE TODOS USUÁRIOS
  app.get('/posts', auth.authenticate(), Users.show);

  app
    .route('/:id/comments')
    .all(auth.authenticate())
    // USER LOGADO CRIA UM COMENTÁRIO EM UM POST
    .post(Comments.store)
    // USER LOGADO VÊ TODOS SEUS COMENTÁRIOS EM UM POST
    .get(Comments.index);

  app
    .route('/:post_id/comments/:comment_id')
    .all(auth.authenticate())
    // USER LOGADO VÊ UM COMENTÁRIO ESPECÍFICO EM UM POST
    .get(Comments.findOne)
    // USER LOGADO EDITA UM COMENTÁRIO ESPECÍFICO EM UM POST
    .put(Comments.update)
    // USER LOGADO DELETA UM COMENTÁRIO ESPECÍFICO EM UM POST
    .delete(Comments.destroy);
};
