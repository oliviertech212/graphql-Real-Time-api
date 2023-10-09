

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
    timestamps:Float!
    users:[User]

 }




type Mutation{

    createuser(name:String! email:String!):User!


    userTyping(email:String! receiverEmail:String!):Boolean!
    
    createmessage( senderEmail:String! receiverEmail:String! message:String! timestamps:Float!):Message!

    updateUser(id:ID! name:String,email:String):User!
    deleteUser(email:String!):User!

}

type Subscription{

    newUser:User
    newMessage(receiverEmail:String):Message
    oldUser:User

     
}
`



    



