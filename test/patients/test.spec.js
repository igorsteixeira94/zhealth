import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/app';
import Patient from '../../src/app/models/Patient';

chai.use(chaiHttp);

const patient = {
  cpf: '05489612315',
  name: 'Igor Rodrigues',
  dateBirth: '12/30/1998',
};

describe('Pacient', () => {
  describe('Create', () => {
    it('it should register a patient', async () => {
      const res = await chai.request(server).post('/patients').send(patient);
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body.cpf).to.be.equals('05489612315');
    });

    it('it should not register an existing patient', async () => {
      const res = await chai.request(server).post('/patients').send(patient);
      expect(res).to.have.status(400);
    });

    it('it should not register a patient with incomplete data', async () => {
      const res = await chai.request(server).post('/patients').send({
        name: 'Invalid Pacient',
        dateBirth: '12/30/1998',
      });

      expect(res).to.have.status(400);
    });
  });

  describe('Update', () => {
    it('it should update a patient', async () => {
      const [{_id}] = await Patient.find({cpf:"05489612315"})
      const res = await chai.request(server).put(`/patients/${_id}`).send({name:"Igor Teixeira"});
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body.cpf).to.be.equals('05489612315');
    });
    it('it should not  register a paciente invalid', async () => {
      const res = await chai.request(server).put(`/patients/5ed18f3433380e0188e5cb92`).send({name:"Igor Teixeira"});
      expect(res).to.have.status(400);
    });
  });

  describe('Show', () => {
    it('it should list an patient', async () => {
      const [{_id}] = await Patient.find({cpf:"05489612315"})
      const res = await chai.request(server).get(`/patients/${_id}`);
      expect(res).to.have.status(200);
      expect(res.body.cpf).to.be.equals('05489612315');
    });
    it('it should not list a paciente invalid', async () => {
      const res = await chai.request(server).get(`/patients/5ed18f3433380e0188e5cb92`);
      expect(res).to.have.status(400);
    });

  });
  describe('Index', () => {
    it('it should list all patient', async () => {
      const res = await chai.request(server).get("/patients/");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });

  });
  describe('Delete', () => {
    it('it should remove a patient', async () => {
      const {_id} = await Patient.create({
        cpf: '05483215',
        name: 'Igor Rodrigues',
        dateBirth: '12/30/1998',
      })
      const res = await chai.request(server).delete(`/patients/${_id}`);
      expect(res).to.have.status(200);

    });
    it('it should not remove a patient invalid', async () => {
      const res = await chai.request(server).delete(`/patients/5ed18f3433380e0188e5cb92`);
      expect(res).to.have.status(400);

    });
  });
});
