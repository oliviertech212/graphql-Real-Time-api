

import { usercontextType } from "../context"
import {user} from '../models'

export const getLogedInUser=async(context:usercontextType)=>{

    try {
    const {userId,email}=context;
    if(!userId){
        throw new Error('you are not logged in');
    }
    const userfound = await user.findById(userId);
  
    
    if (userfound){
        return {user: userfound}
    }
        
    } catch (error:any) {
        console.log(error);
        
         throw new error (error.message)
    }
}