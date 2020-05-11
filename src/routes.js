import Users from './controllers/user-controller';
import SessionController from './controllers/session-controller';
import Posts from './controllers/post-controller';

export default (app, auth) => {
  // SIGNUP DE UM USER
  app.post('/api/signup', SessionController.signUp);

  // SIGNIN DE UM USER
  app.get('/api/signin', SessionController.signIn);

  app
    .route('/api/users')
    .all(auth.authenticate())
    // DELETA O USER LOGADO
    .delete(Users.destroy)
    // EDITA O USER LOGADO
    .put(Users.update)
    // RETORNA DADOS DO USER LOGADO
    .get(Users.findOne);

  app
    .route('/api/users/posts')
    .all(auth.authenticate())
    // USER LOGADO CRIA UM POST
    .post(Posts.store)
    // USER LOGADO VÊ TODOS OS SEUS POSTS
    .get(Posts.index);

  app
    .route('/api/users/posts/:id')
    .all(auth.authenticate())
    // USER LOGADO DELETA UM POST
    .delete(Posts.destroy)
    // USER LOGADO EDITA UM POST
    .put(Posts.update)
    // USER LOGADO VÊ UM POST ESPECÍFICO
    .get(Posts.findOne);

  // RETORNA UMA LISTA DE USERS
  app.get('/users', Users.index);
};
