import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { env } from "@source/env.mjs";
import { prisma } from "@server/db";
import { User } from "@prisma/client";
import { checkHashPassword, hashPassword } from "./libs/helpers";
import dayjs from "dayjs";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      const user: User = token.user as User;

      return {
        ...session,
        user: {
          email: user.email,
          id: user.id,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },

  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 60 * 60, // 1 hours
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
          select: {
            id: true,
            password: true,
          },
        });

        if (!user) {
          // Sign up new user if don't have any user, only for testing purpose
          const hash = await hashPassword(credentials?.password ?? "");
          const userCreated = await prisma.user.create({
            data: {
              email: credentials?.email,
              password: hash,
              emailVerified: dayjs().toISOString(), //Only for testing case
            },
            select: {
              id: true,
              email: true,
            },
          });
          return userCreated;
        }

        let userHashPassword = user?.password || "";

        let checkHash = await checkHashPassword(
          credentials?.password || "",
          userHashPassword
        );

        if (checkHash) {
          user.password = "";
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
