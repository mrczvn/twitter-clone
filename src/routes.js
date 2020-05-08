import Users from './controllers/user-controller';

export default (app) => {
  app.post('/users', Users.store);
  app.get('/users', Users.index);
};
