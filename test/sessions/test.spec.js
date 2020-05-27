import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/app';

chai.use(chaiHttp);

const login = {
  email: 'igor16@gmail.com',
  password: '123456741',
};
describe('Session', () => {
  describe('Create', () => {
    it('it should login for doctor', async () => {
      const response = await chai.request(server).post('/sessions').send(login);
      expect(response).to.have.status(200);
      expect(response.body).to.have.property('token');
    }),
      it('it should not login for doctor with invalid data', async () => {
        const response = await chai.request(server).post('/sessions').send({
          email: 'fulano@gmail.com',
          password: '123156974',
        });
        expect(response).to.have.status(401);
      });
  });
});
