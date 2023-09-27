"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `
 type Query{
    users:User
    messages:Message
 }
 

type  User{
    id:ID!
    name:String!
    email:String!
    messages:Message
 }

type Message{
    id:ID!
    senderEmail:String!
    receiverEmail:String!
    timestamp:Float!
    users:User!

 }




type Mutation{

    createuser(name:String! email:String!):User!
    
}
`;
