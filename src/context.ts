
import decodeToken from "./auth/decodeToken";
const dotenv = require('dotenv');
dotenv.config();
export type GraphQLContext = {
  userfound:string
}

export type usercontextType={
  email: string;
  userId: string;
}
 
export async function createContext({request}:any):Promise<GraphQLContext> {
  // const token = await request.headers.authentication;
  const authorizationHeader = request.headers.get('Authorization');
  const userfound=await decodeToken(authorizationHeader);
  return {userfound};
}