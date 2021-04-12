import bcrypt from "bcryptjs";

const users = [
    {
        email: 'test@example.com',
        password: bcrypt.hashSync('1234', 10),
    },
    {
        email: 'test@eple.com',
        password:  bcrypt.hashSync('134', 10),
    },

]

export default users;