import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authoptions =  NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
},
jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET
},
secret: process.env.NEXTAUTH_SECRET,
debug: process.env.NODE_ENV === "development"
});


export {authoptions as GET, authoptions as POST}