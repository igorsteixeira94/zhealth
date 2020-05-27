/**
 * Excluir o banco de dados ao finalizar todos os testes
 */

import mongoose from 'mongoose';

after((done) => {
  mongoose.connect(
    process.env.MONGO_DB_TEST,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, database) => {
      if (err) return done;
      return database.dropDatabase(done);
    }
  );
});
