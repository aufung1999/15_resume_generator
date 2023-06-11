import NextAuth, { DefaultSession } from "next-auth";
import { User, Session } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      address: string;
    };
  }
}
