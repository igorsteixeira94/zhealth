import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/app';

chai.use(chaiHttp);

const doctor = {
  cpf: '05489612316',
  email: 'igor16@gmail.com',
  name: 'Igor Rodrigues',
  dateBirth: '12/30/1998',
  crm_cod: '1.056',
  crm_state: 'BA',
  gender: 'M',
  password: '123456741',
  confirm_password: '123456741',
};

describe('Doctor', () => {
  describe('Create', () => {
    it('it should register an doctor', async () => {
      const res = await chai.request(server).post('/doctors').send(doctor);
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body.cpf).to.be.equals('05489612316');
    });

    it('it should not register an existing doctor', async () => {
      const res = await chai.request(server).post('/doctors').send(doctor);
      expect(res).to.have.status(400);
    });

    it('it should not register an doctor with incomplete data', async () => {
      const res = await chai.request(server).post('/doctors').send({
        cpf: '159357123',
        email: 'invalid@gmail.com',
        name: 'Invalid Doctor',
        dateBirth: '12/30/1998',
        crm_cod: '1.056',
        crm_state: 'BA',
        gender: 'M',
        password: '123456741',
      });

      expect(res).to.have.status(400);
    });
  });
});
