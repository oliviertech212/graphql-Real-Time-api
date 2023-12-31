
import {user} from '../models'
import { Message } from '../models'
import { GraphQLError } from 'graphql'
import mongoose, { Schema } from 'mongoose'
import * as orgon2 from 'argon2';
const  jwt = require('jsonwebtoken');

import { getLogedInUser } from '../helpers/user.helpers';


import { PubSub, withFilter } from 'graphql-subscriptions'
const pubsub:any = new PubSub();

type usertype={
    name:string,
    email:string,
    password:string
}

export const resolvers={

    Query:{
        users:async(_:any, args:any, context:any)=>{
            const {userfound}=context;
            try {
                return user.find();   
            } catch (error:any) {
                throw new GraphQLError(`not found.`)
            }
        },
        getLogedInUser:async(_:any,args:any,context:any)=>{
            try {
                const {userfound}=context;
            const user=await getLogedInUser(userfound)
            console.log("userfound",userfound,user);
            return user  ; 
            } catch (error:any) {
                console.log(error.message);
                
            }
        }
        ,
        userMessages:async(_:any,userID:any)=>{
            try{
             const  messages=  await Message.find({userMessage:new mongoose.Types.ObjectId(userID.userID)});
             if(!messages){
                throw new GraphQLError("no messages found")
             }
             return messages;

            }catch(error:any){
                 throw new GraphQLError(error.message)
            }
        }
        ,
        messages:async()=>{
            try {
                return Message.find();   
            } catch (error:any) {
                throw new GraphQLError(`message not found.`)
            }
            
     
        }
    },

    Mutation:{
        createuser: async(_:any,{name, email,password}:usertype)=>{
            try {

                const hash = await orgon2.hash(password);

                const newUser = new user({ name: name, email: email, password:hash});

                const existuser= await user.findOne({ email: newUser.email });
                if (existuser){
                    throw new GraphQLError(`${newUser.email} already exists`);
                }
                const savedUser = await newUser.save();
                // publish suscription
                pubsub.publish('newuser',{newUser:savedUser});
                return  savedUser;
                
            } catch (error:any) {
                console.log(error.message);
                throw new GraphQLError(`${error}`)
                 
            }
           
        },

        updateUser:async(_:any,{id,name,email}:{id:string,name:string,email:string})=>{
            try {

                const newUser = new user({id:id,email:email });
                const existuser= await user.findOne({ email: newUser.email });
                    if (existuser){
                        throw new GraphQLError(`${newUser.email} already exists`);
                    }
                  
                    
                const usertoUpdate= await user.findOneAndUpdate({_id:id},{name:name,email:email},{new:true});
                return usertoUpdate;
                
            } catch (error:any) {
                throw Error (`Error while updating ${error.message}`);
                
            }
        }
        ,

        deleteUser:async(_:any,{email}:{email:string})=>{
            try {

                const existuser= await user.findOne({ email:email });
                    if (!existuser){
                        throw new GraphQLError(`user with ${email} not found`);
                    }
                const usertoDelete= await user.findOneAndDelete({email:email});
                const meassage= await Message.findOneAndDelete({senderEmail:email})


               pubsub.publish('deleteUser',{userDeleted:usertoDelete});
               

               return usertoDelete;
                
            } catch (error:any) {
                throw Error (`Error while updating ${error.message}`);
                
            }
        }
  ,

        userTyping : async(_:any,{email,receiverEmail}:any)=>{
            try {
                const existuser= await user.findOne({ email:email });
                if (!existuser){
                    throw new GraphQLError(`user with ${email} not found`);
                }
                 pubsub.publish("usertyping",{userTyping:{email:email}});
            return existuser ;     
            } catch (error:any) {
                throw Error (`Error while Typing ${error.message}`);
                
            }

        }
        ,

        createmessage:async(_:any,{message,receiverEmail,senderEmail,timestamps,userID}:any)=>{
            try { 

                const User = new user({id:userID,email:receiverEmail});
                 console.log("hello user found",User);
                 
                const existuser= await user.findOne({_id:userID,email:receiverEmail});
                console.log(existuser);
                
                if (!existuser){
                    throw new GraphQLError(`user with ${receiverEmail} does not exists`);
                }

                    
                const mess= new Message({message:message ,
                     receiverEmail:receiverEmail,
                     senderEmail:senderEmail,
                     timestamps:timestamps,
                     userMessage:userID
                    
                    });
                const newmessage=await mess.save();
                // publish new message
                pubsub.publish('newmessage',{newMessage:newmessage})
                return newmessage;
                
            } catch (error:any) {

                console.log(`${error.message}`);   
            }
        },

        updateMessage:async (_:any,{id, newMessage}:any) => {
            try {
             const mess =await Message.findById({_id: new mongoose.Types.ObjectId(id)});
           
             if (!mess) {
            throw new Error ("Could not find message");
             }
                const messageUpdate = Message.findByIdAndUpdate ({_id: new mongoose.Types.ObjectId(id)},{message:newMessage},{new:true});
             return messageUpdate;
             
                
            } catch (error:any) {


                throw new Error(`${error.message}`)
                
            }


        }
        ,
        deleteMessage:async(_:any,id:string)=>{
            try{ 
               await Message.findOneAndDelete({_id: new mongoose.Types.ObjectId(id) });
               return true;
            }catch(error:any){
                console.log(error.message);
                
            }
        }

        ,
        deleteAll:async(_:any)=>{
            try{ 
               await Message.deleteMany();
               return true;
            }catch(error:any){
                console.log(error.message);
                
            }
        },

        // authentication resolvers
        userLogin : async(_:any,{email:email,password}:{email:string,password:string})=>{  

            try {
                const hash = await orgon2.hash(password);
                const userExists = await user.findOne({ email:email});
            
                if(!userExists){
                    throw new Error (` User with ${email} not found `);
                }
                const userpassword =userExists.password;                
                if(await orgon2.verify(userpassword,password)){

                    const token = jwt.sign({email:email, userId: userExists.id }, process.env.JWT_SECRET, { expiresIn: '10h' } );
                      return {token:token};

                }else{
                    throw new Error(`password not match`)
                }

            } catch (error:any) {
                
                throw new Error(`${error.message}`)
            }

         }


        }

    ,


    Subscription:{


        newUser:{
            subscribe:(_:any,{}:any) =>{
            return pubsub.asyncIterator('newuser')
             }    
        }
        ,

        newMessage:{
            subscribe:withFilter(
                ()=>pubsub.asyncIterator('newmessage'),
                (payload,variables)=> 
                   payload.newMessage.receiverEmail===variables.receiverEmail,
            )
        
        },

        userDeleted:{
            subscribe:(_:any,{}:any)=>{
                return pubsub.asyncIterator('deleteUser')
            }
        },

        userTyping:{
            subscribe:withFilter(
                ()=>pubsub.asyncIterator('usertyping'),
                (payload,variables)=> payload.userTyping.email === variables.email,
            )
        }

    }
}

