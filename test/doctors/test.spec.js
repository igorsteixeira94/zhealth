import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/app';
import Doctor from '../../src/app/models/Doctor';

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
    it('it should register a doctor', async () => {
      const res = await chai.request(server).post('/doctors').send(doctor);
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body.cpf).to.be.equals('05489612316');
    });

    it('it should not register a existing doctor', async () => {
      const res = await chai.request(server).post('/doctors').send(doctor);
      expect(res).to.have.status(400);
    });

    it('it should not register a doctor with incomplete data', async () => {
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

  describe('Index', () => {
    it('it should list all doctor', async () => {
      const res = await chai.request(server).get('/doctors')
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('array');
    });
  });

  describe('Show', () => {
    it('it should list a doctor', async () => {
      const [{_id},...rest] = await Doctor.find();
      const res = await chai.request(server).get(`/doctors/${_id}`)
      expect(res).to.have.status(200);
    });

    it('it should not list a doctor invalid', async () => {
      const res = await chai.request(server).get('/doctors/5ed1b73d18b2c116ba0a9fdc')
      expect(res).to.have.status(400);
    });
  });

  describe('Update', () => {
    it('it should update a doctor', async () => {
      const [{_id},...rest] = await Doctor.find();
      const res = await chai.request(server).put(`/doctors/${_id}`).send({name:"hulk"})
      expect(res).to.have.status(200);
      expect(res.body.name).to.equal('hulk');
    });
    it('it should not update a doctor invalid', async () => {
      const res = await chai.request(server).put(`/doctors/5ed1b73d18b2c116ba0a9fdc`).send({name:"hulk"})
      expect(res).to.have.status(400);
    });
  });

  describe('Delete', () => {
    it('it should not delete a doctor invalid', async () => {
      const res = await chai.request(server).delete(`/doctors/5ed1b73d18b2c116ba0a9fdc`).send({name:"hulk"})
      expect(res).to.have.status(400);
    });
  });
});
