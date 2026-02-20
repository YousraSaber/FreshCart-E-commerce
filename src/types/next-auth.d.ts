import NextAuth, {User} from "next-auth";

declare module "next-auth" {
  interface User {
    user :{
        role :string ,
        email : string,
        name : string
    },
    token :string
  }
  interface Session {
    user :{
        role :string ,
        email : string,
        name : string
    }
  }
}


declare module "next-auth/jwt" {
  interface JWT extends User {
    /** OpenID ID Token */
    idToken?: string
  }
}