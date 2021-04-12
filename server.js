import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

//connect dotenv
dotenv.config();

//connect to mongodb
connectDB();

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => console.log(`Server started on ${PORT}`));