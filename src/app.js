import express from 'express';
import dotenv from 'dotenv';
import swaggerSetup from '../swagger';

dotenv.config();

import bodyParser from 'body-parser';
import router from './route';
import { connectDB } from './model/index';

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(router);

swaggerSetup(app);

connectDB().catch(console.error);

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
  } else console.log("Error occurred, server can't start", error);
});


