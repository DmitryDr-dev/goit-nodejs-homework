import app from '../app';
import db from '../helper/db';

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server Running. Use our API on port: ${PORT}`);
  });
}).catch(error => {
  console.log(`Error on starting sever: ${error.message}`);
});
