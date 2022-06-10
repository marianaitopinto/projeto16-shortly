import express, { json } from 'express';
import routers from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(json());
app.use(routers);

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});