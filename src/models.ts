

import mongoose from "mongoose";
import { Schema } from "mongoose";


//  const  userSchema= new Schema({
//     name:{
//         required: true,
//         type: "string",
//     },
//     email:{
//         required: true,
//         type: "string",
//         unique: true
//     }
// });

// const UserModel = mongoose.model("User", userSchema);
// export default UserModel;


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
  });
  
 export const user = mongoose.model("User", userSchema);

const msg = new mongoose.Schema({
    message:{type: String},
    senderEmail:{type: String},
    receiverEmail:{type: String},
    timestamps:{type: Number}
});

export const Message = mongoose.model('Message',msg);
