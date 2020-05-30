import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/app';
import Patient from '../../src/app/models/Patient';
import Doctor from '../../src/app/models/Doctor';
import Prescription from '../../src/app/models/Prescription';

chai.use(chaiHttp);

// dados para criar uma nova prescrição
const prescription = {
  patient_id: '213564564',
  remedy: [
    {
      name: 'Dipirona',
      description: 'analgesico',
      qtd: '12',
      dosage: '5ml',
      frequency: '7 dias',
    },
    {
      name: 'Paracetamol',
      description: 'analgesico',
      qtd: '12',
      dosage: '1 comprimido',
      frequency: '12 horas',
    },
  ],
};

let token;
let tokenDoctor2

describe('Prescription', () => {
  before(async () => {
    // buscar por um paciente

    const [{ _id }, ...rest] = await Patient.find();
    prescription.patient_id = _id;

    const { body } = await chai.request(server).post('/sessions').send({
      email: 'igor16@gmail.com',
      password: '123456741',
    });
    token = body.token;
  });

  describe('Create', () => {
    it('it should register a prescription', async () => {
      const response = await chai
        .request(server)
        .post('/prescriptions')
        .set('Authorization', `Bearer ${token}`)
        .send(prescription);
      expect(response).to.have.status(200);
    });
  });

  describe('List', () => {
    it('it should list the doctor prescriptions', async () => {
      const response = await chai
        .request(server)
        .get('/prescriptions')
        .set('Authorization', `Bearer ${token}`);
      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.equals(1);
    });

    it('it should not list other doctors prescriptions ', async () => {
      await Doctor.create({
        cpf: '22222222',
        email: 'doctor2@gmail.com',
        name: 'Doctor 2',
        dateBirth: '1994-06-12T03:00:00.000Z',
        crm_cod: '1.056',
        crm_state: 'BA',
        gender: 'M',
        password: 'doctor2',
        confirm_password: 'doctor2',
      });

      const { body } = await chai.request(server).post('/sessions').send({
        email: 'doctor2@gmail.com',
        password: 'doctor2',
      });
      tokenDoctor2 = body.token;

      const response = await chai
        .request(server)
        .get('/prescriptions')
        .set('Authorization', `Bearer ${tokenDoctor2}`);

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.equals(0);
    });
  });

  describe('Show', () => {
    it('it should show the doctor prescription', async () => {
      const [{_id},...res] = await Prescription.find();
      const response = await chai
        .request(server)
        .get(`/prescriptions/${_id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response).to.have.status(200);
    });

    it('it should not show other doctor prescription', async () => {

      const { body } = await chai.request(server).post('/sessions').send({
        email: 'doctor2@gmail.com',
        password: 'doctor2',
      });
      const tokenDoctor2 = body.token;

      const [{_id},...res] = await Prescription.find();

      const response = await chai
        .request(server)
        .get(`/prescriptions/${_id}`)
        .set('Authorization', `Bearer ${tokenDoctor2}`);

      expect(response).to.have.status(400);
    });
  });

  describe('Update', () => {

    it('it should update the doctor prescriptions', async () => {
      const [{ _id }, ...rest] = await Prescription.find()
      const response = await chai
        .request(server)
        .put(`/prescriptions/${_id}`)
        .send({
          remedy: [
            {
              name: 'Alcool em gel',
              description: 'Limpeza',
              qtd: '12',
              dosage: '5ml',
              frequency: '7 dias',
            }
          ]
        })
        .set('Authorization', `Bearer ${token}`);
      expect(response).to.have.status(200);
      expect(response.body.remedy).to.be.an('array');
      expect(response.body.remedy.length).to.equals(1);
      expect(response.body.remedy[0].name).to.equal('Alcool em gel')
    });


    it('it should not update the other doctor prescriptions', async () => {
      const [{ _id }, ...rest] = await Prescription.find()
      const response = await chai
        .request(server)
        .put(`/prescriptions/${_id}`)
        .send({
          remedy: [
            {
              name: 'Alcool em gel',
              description: 'Limpeza',
              qtd: '12',
              dosage: '5ml',
              frequency: '7 dias',
            }
          ]
        })
        .set('Authorization', `Bearer tokenInvalid`);
      expect(response).to.have.status(401);
    });
  });


  describe('Delete', () => {

    it('it should delete the doctor prescription', async () => {
      const [{ _id }, ...rest] = await Prescription.find()
      const response = await chai
        .request(server)
        .delete(`/prescriptions/${_id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response).to.have.status(200);
    });

    it('it should not delete the outhers doctor prescription', async () => {
      const res = await chai
      .request(server)
      .post('/prescriptions')
      .set('Authorization', `Bearer ${token}`)
      .send(prescription);

      const response = await chai
        .request(server)
        .delete(`/prescriptions/${res.body._id}`)
        .set('Authorization', `Bearer ${tokenDoctor2}`);
      expect(response).to.have.status(401);

    });
  });

});
