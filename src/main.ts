

import { createServer } from 'http'
import { createYoga,PubSub } from 'graphql-yoga'
import { schema } from './schema'
import mongoose from 'mongoose';
import { createContext } from './context';
const dotenv = require('dotenv');
dotenv.config();


const db: string = process.env.DB || ""

const connect = async () => {
    try { 
      const con = await mongoose.connect(db!)
      if (con){
        console.log("Database connected");
      }
      return con;
    } catch (error) {
      console.log(`Database connection error please check : ${error}`)
      process.exit(1)
    }
  }
 
async function main() {
  const yoga = createYoga({ schema, context:createContext })
  const server = createServer(yoga)
  connect().then(() =>
  server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql')
  })

  );
  
}
 
main()