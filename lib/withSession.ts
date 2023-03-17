import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next/types";

const sessionOptions = {
  cookieName: "Alfie:sessionCookie",
  password: process.env.SESSION_COOKIE_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function withSessionRoute(handler: NextApiHandler<any>) {
  return withIronSessionApiRoute(handler, sessionOptions);
}
