import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
    ],
    adapter: PrismaAdapter(prisma) as Adapter,
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
    },
   
};

const authHandler = NextAuth(authOptions);
export { authHandler as GET, authHandler as POST };