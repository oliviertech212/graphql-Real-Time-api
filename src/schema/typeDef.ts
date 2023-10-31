

 export const typeDefs= 

`
 type Query{
    users:[User]
    messages:[Message]
 }
 

type  User{
    id:ID
    name:String!
    email:String!
    messages:[Message]
 }

type Message{
    id:ID!
    senderEmail:String!
    receiverEmail:String!
    timestamps:String
    message:String!
    users:[User]

 }




type Mutation{

    createuser(name:String! email:String!):User!
    updateUser(id:ID! name:String,email:String):User!
    deleteUser(email:String!):User!

    userTyping(email:String! receiverEmail:String!):User!
    
    createmessage( senderEmail:String! receiverEmail:String! message:String! ):Message!
    updateMessage(id:ID! newMessage:String!):Message
    deleteMessage(id:ID!):Boolean!
    deleteAll:Boolean!

   

}

type Subscription{

    newUser:User
    newMessage(receiverEmail:String):Message
    userDeleted:User
    userTyping(email:String! receiverEmail:String!):User!

     
}
`



    



