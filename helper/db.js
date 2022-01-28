import mongoose from 'mongoose';

const { connect, connection } = mongoose;
const uri = process.env.URI_DB;

const db = connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on('connect', () => {
  console.log('Mongoose connected to DB');
});

connection.on('error', error => {
  console.log(`Connection error to DB: ${error.message}`);
});
connection.on('disconnect', () => {
  console.log('Mongoose disconnected from DB');
});

process.on('SIGINT', async () => {
  connection.close();
  console.log('Connection to DB Closed');
  process.exit(1);
});

export default db;
