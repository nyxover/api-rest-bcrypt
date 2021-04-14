import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler ( async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        console.log('Token Found')

        try{

            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log(decoded);

            req.User = await User.findById(decoded.id).select('-password');
            next();

        } catch (err){
            console.log(err);
            res.status(401);
            throw new Error('Not authorized');
        }
    } else if(!token){
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

const admin = (req, res, next) => {
    if(req.User && req.User.isAdmin){
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
}

export {admin, protect};