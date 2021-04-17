import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import movieRoutes from './routes/movieRoutes.js';

import userRoutes from './routes/userRoutes.js';

const PORT = process.env.PORT || 3001;
const app = express();

//connect dotenv
dotenv.config();

//connect to mongodb
connectDB();

//middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Used to parse son so that it can be read
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api/movies', movieRoutes);

app.use('/api/users', userRoutes);



app.listen(PORT, () => console.log(`Server started on ${PORT}`));