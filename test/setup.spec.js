/**
 * Se existe algum banco de dados é excluido, antes de rodar os testes
 */
import mongoose from 'mongoose';

describe('Drop DataBase', () => {
  before((done) => {
    mongoose.connect(
      process.env.MONGO_DB_TEST,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, database) => {
        if (err) return done;
        return database.dropDatabase(done);
      }
    );
  });
});
