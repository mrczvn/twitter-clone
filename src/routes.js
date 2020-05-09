import Users from './controllers/user-controller';

export default (app) => {
  // RETORNA A CRIAÇÃO DE UM USER
  app.post('/users', Users.store);

  // RETORNA UMA LISTA DE USERS
  app.get('/users', Users.index);

  // RETORNA UM USER ESPECIFICO
  app.get('/users/:id', Users.findOne);

  // RETORNA UPDATE DE UM USER
  app.put('/users/:id', Users.update);

  // DESTROY DE UM USER
  app.delete('/users/:id', Users.destroy);
};
