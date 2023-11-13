
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();



const decodeToken=async (token:any) => {
    try {
        if(token){
            return jwt.verify(token,process.env.JWT_SECRET);
        }
    } catch (error:any) {
        console.log(error.message);
        throw new Error(error.message);
    }

}

 export default decodeToken;