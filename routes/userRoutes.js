import express from 'express';
import {protect, admin} from '../middleware/authMiddleware.js';
import { register, authUser, getUsers, getUserById, deleteUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

router
    .route('/')
    .get(protect, admin, getUsers)
    .post(register)

router
    .route('/login')
    .post(authUser)

router
    .route('/:id')
    .get(protect, admin, getUserById)
    .delete(protect, admin, deleteUser)
    .put(protect, updateUser)


export default router;