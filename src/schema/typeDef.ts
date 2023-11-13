

 export const typeDefs= 

`

 

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

type userToken{
    token:String!
}



 type Query{
    users:[User]
    messages:[Message]
    userMessages(userID:String!):[Message]
    getLogedInUser:[User]
 }


type Mutation{

    createuser(name:String! email:String!,password:String!):User!
    updateUser(id:ID! name:String,email:String):User!
    deleteUser(email:String!):User!

    userTyping(email:String! receiverEmail:String!):User!
    
    createmessage( senderEmail:String! receiverEmail:String! message:String! userID:String):Message!
    updateMessage(id:ID! newMessage:String!):Message
    deleteMessage(id:ID!):Boolean!
    deleteAll:Boolean!


    userLogin (email:String!,password:String!):userToken! 

}

type Subscription{

    newUser:User
    newMessage(receiverEmail:String):Message
    userDeleted:User
    userTyping(email:String! receiverEmail:String!):User!

     
}
`



    



