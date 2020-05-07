describe('Routes User', () => {
  const defaultUser = {
    id: 1,
    name: 'Marcos',
  };

  describe('Route GET /users', () => {
    it('deve retorna uma lista de usuarios', (done) => {
      request.get('/users').end((err, res) => {
        expect(res.body[0].id).to.be.eql(defaultUser.id);
        expect(res.body[0].name).to.be.eql(defaultUser.name);
        done(err);
      });
    });
  });
});
