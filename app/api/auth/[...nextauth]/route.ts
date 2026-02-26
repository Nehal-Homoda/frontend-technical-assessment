import NextAuthConfig from "@/next-auth/nextAuth.config";
import NextAuth from "next-auth";

const nextHandler = NextAuth(NextAuthConfig);
export { nextHandler as GET, nextHandler as POST };
