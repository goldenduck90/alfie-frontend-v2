import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next/types";

const sessionOptions = {
  cookieName: "Alfie:sessionCookie",
  password: "HQ3x9hkUHNM37woBQdrquNL2CF2RbTxUHNM37wo" as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function withSessionRoute(handler: NextApiHandler<any>) {
  return withIronSessionApiRoute(handler, sessionOptions);
}
