import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
// import prisma from '../../../libs/prismadb'
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import User from "@/models/User";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import db from "@/utils/db";
import { signIn } from "next-auth/react";

const mongoose = require("mongoose");
const MONGODB_URL: string = process.env.MONGODB_URL as string;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // maxAge: 3000,
  },
  providers: [
    // GithubProvider({
    //     clientId: process.env.GITHUB_ID,
    //     clientSecret: process.env.GITHUB_SECRET,
    // }),
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_ID,
    //     clientSecret: process.env.GOOGLE_SECRET,
    // }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        // username: {
        //   label: "Username",
        //   type: "text",
        //   placeholder: "John Smith",
        // },
      },
      async authorize(credentials: any) {
        // check to see if email and password is there
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter an email and password");
        }

        await db.connect();
        await mongoose.connect(MONGODB_URL);

        // check to see if user exists
        const user = await User.findOne({
          email: credentials.email,
        });

        await db.disconnect();

        // console.log("11111111111111111111111111111111111");
        // console.log("user: " + user);
        // console.log("11111111111111111111111111111111111");

        // if no user was found
        if (!user || !user?.password) {
          throw new Error("No user found");
        }

        // check to see if password matches
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        console.log(passwordMatch);
        // if password does not match
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],

  // callbacks: {
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     // console.log("**************************************");
  //     // console.log(account);
  //     // console.log(profile);
  //     // console.log(user);
  //     // console.log("**************************************");
  //     // console.log(token);

  //     return { ...token, ...user };
  //   },
  //   async session({ session, token, user }) {
  //     // console.log(token._doc);
  //     // console.log("user: " + user);
  //     // console.log("-------------------------");
  //     // console.log(session);
  //     // console.log("-------------------------");

  //     session.user = token as any;
  //     // console.log(session);
  //     return session;
  //   },
  // },

  jwt: {
    secret: process.env.SECRET,
  },

  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
