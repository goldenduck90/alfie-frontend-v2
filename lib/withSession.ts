import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next/types";

const sessionOptions = {
  cookieName: "Alfie:sessionCookie",
  password: "complex_password_at_least_32_characters_long",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function withSessionRoute(handler: NextApiHandler<any>) {
  return withIronSessionApiRoute(handler, sessionOptions);
}
