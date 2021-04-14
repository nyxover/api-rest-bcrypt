import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

//Description: Regiseter a new user
// route: POST /api/user_schema
// Acess Level: Public

const register = asyncHandler ( async (req, res) => {
    const { email, password } = req.body;

    //We want to see if the user exists
    const userExists = await User.findOne({ email: email });
    
    if(userExists){
        res.status(400);
        throw new Error(`User already exists`);
    }

    //if user does not exist
    const user = await User.create({
        email,
        password
    })

    //chek for the user to
if(user){
    res.status(201).json({
        _id: user._id,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
    })

} else {
    // trow an error if user is invalid
    res.status(400);
    throw new Error('Invalid User');
}
})

export { register };