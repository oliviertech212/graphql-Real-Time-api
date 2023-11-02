

import mongoose from "mongoose";
import { Schema } from "mongoose";
import { schema } from "./schema";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
   
  });
  
 export const user = mongoose.model("User", userSchema);

const msg = new mongoose.Schema({
    userMessage: { type: Schema.Types.ObjectId, ref:'user'},
    message:{type: String,required: true},
    senderEmail:{type: String},
    receiverEmail:{type: String},
    timestamps:{ type: Date, default: Date.now}
});

export const Message = mongoose.model('Message',msg);
