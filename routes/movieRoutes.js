import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';
import { getMovies, getMovieById, deleteMovie, createMovie, updateMovie} from '../controllers/MovieController.js';

router
    .route('/')
    .get(getMovies)
    .post(protect, admin, createMovie);

    
router
    .route('/:id')
    .get(getMovieById)
    .delete(protect, admin, deleteMovie)
    .put(protect, admin, updateMovie);



export default router;