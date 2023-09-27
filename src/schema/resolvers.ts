
import {user} from '../models'
import { Message } from '../models'
import { GraphQLError } from 'graphql'

import { PubSub, withFilter } from 'graphql-subscriptions'
const pubsub:any = new PubSub();

type usertype={
    name:string,
    email:string
}

export const resolvers={

    Query:{
        users:async()=>{
            try {

                return user.find();
                
            } catch (error:any) {
                throw new GraphQLError(`not found.`)
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
        createuser: async(_:any,{name, email}:usertype)=>{
            try {

                const newUser = new user({ name: name, email: email });

                const existuser= await user.findOne({ email: newUser.email });
                if (existuser){
                    throw new GraphQLError(`${newUser.email} already exists`);
                }
                const savedUser = await newUser.save();
                console.log("user created",name,email);

                // publish suscription
                pubsub.publish('newuser',{newUser:savedUser});



                return  savedUser;
                
            } catch (error:any) {
                console.log(error.message);
                throw new GraphQLError(`${error}`)
              

                
                
            }
           
        }
  ,

        userTyping : async(_:any,{email,receiverEmail}:any)=>{

            try {


                
            } catch (error) {

                
            }

        }
        ,

        createmessage:async(_:any,{message,receiverEmail,senderEmail,timestamps}:any)=>{
             

            try {
                const mess= new Message({meassage:message , receiverEmail:receiverEmail,senderEmail:senderEmail,timestamps:timestamps});
                const newmessage=await mess.save();

                console.log("message",mess);
                
                // publish new message
                pubsub.publish('newmessage',{newmessage:newmessage})
                return newmessage;
                
            } catch (error:any) {

                console.log("ggggggg");
                
            }
            

        }





    }

    ,


    Subscription:{


        newuser:{
            subscribe:(_:any,{}:any) =>{
            return pubsub.asyncIterator('newuser')
             }    
        }
        ,

        newmessage:{

            subscribe:withFilter(
                ()=>pubsub.asyncIterator('newmessage'),
                (payload,variables)=>{
                    return payload.receiverEmail===variables.receiverEmail;
                }
            )
        
        }





    }
}

