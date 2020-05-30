import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    if (process.env.NODE_ENV === 'test') {
      this.connection = mongoose.connect(process.env.MONGO_DB_TEST, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      });
    } else {
      this.connection = mongoose.connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      });
    }
  }
}

export default new Database();
