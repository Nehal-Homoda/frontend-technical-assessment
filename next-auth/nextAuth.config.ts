import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const NextAuthConfig: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "name", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const res = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          const data = await res.json();

          if (!res.ok) return null;

          return {
            id: String(data.id),
            name: data.username,
            email: data.email || `${data.username}@example.com`,
            credentialsToken: data.token,
            role: data.role || "user",
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-ignore
        token.credentialsToken = user.credentialsToken;
        // @ts-ignore
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id as string;
        // @ts-ignore
        session.user.credentialsToken = token.credentialsToken as string;
        // @ts-ignore
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

export default NextAuthConfig;
