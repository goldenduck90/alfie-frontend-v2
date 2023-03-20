import { withIronSessionApiRoute } from "iron-session/next";
import httpProxyMiddleware from "next-http-proxy-middleware";

const target = process.env.NEXT_PUBLIC_GRAPHQL_API

export default withIronSessionApiRoute(
  async function handler(req, res) {
    const token = (req.session as any).token;
    const headers: { [key: string]: string } = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return httpProxyMiddleware(req, res, {
      target,
      headers,
      ignorePath: true,
    });
  },
  {
    cookieName: "Alfie:sessionCookie",
    password: process.env.SESSION_COOKIE_PASSWORD as string,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
