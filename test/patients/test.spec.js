import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/app';

chai.use(chaiHttp);

const patient = {
  cpf: '05489612315',
  name: 'Igor Rodrigues',
  dateBirth: '12/30/1998',
};

describe('Pacient', () => {
  describe('Create', () => {
    it('it should register an patient', async () => {
      const res = await chai.request(server).post('/patients').send(patient);
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body.cpf).to.be.equals('05489612315');
    });

    it('it should not register an existing patient', async () => {
      const res = await chai.request(server).post('/patients').send(patient);
      expect(res).to.have.status(400);
    });

    it('it should not register an patient with incomplete data', async () => {
      const res = await chai.request(server).post('/patients').send({
        name: 'Invalid Pacient',
        dateBirth: '12/30/1998',
      });

      expect(res).to.have.status(400);
    });
  });
});
