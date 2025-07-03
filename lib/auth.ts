import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        try {
          await dbConnect();
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("User not found");
          }
         const isPasswordValid = await bcrypt.compare(
           credentials.password,
           user.password
         );

         if(!isPasswordValid) {
           throw new Error("Invalid password");
         }

         return {
            id : user._id.toString(), // later create a problem so that why toString() is used
            name: user.name,
            email: user.email,
         }
        } catch (error) {
            console.error("Error in authorize:", error);
            throw new Error("Authorization failed");
        }
      },
          }),
  ],
  callbacks:{
    async jwt({token,user}){
        if(user){
            token.id = user.id;
        }
        return token;
    },
   async session({session,token}){
      if(session.user){
        session.user.id = token.id as string; // Type assertion to ensure token.id is treated as a string
      }
      return session;
   }

  },
  pages:{
    signIn:"/login",
    error: "/login",
  },
  session:{
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET!
};
