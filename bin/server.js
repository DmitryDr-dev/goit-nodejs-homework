import app from '../app';
import db from '../helper/db';
import fs from 'fs/promises';

const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = process.env.UPLOAD_DIR;
const AVATAR_DIR = process.env.AVATAR_DIR;

db.then(() => {
  app.listen(PORT, async () => {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.mkdir(AVATAR_DIR, { recursive: true });
    console.log(`Server Running. Use our API on port: ${PORT}`);
  });
}).catch(error => {
  console.log(`Error on starting sever: ${error.message}`);
});
