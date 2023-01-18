import httpProxyMiddleware from "next-http-proxy-middleware";
import { withIronSessionApiRoute } from "iron-session/next";

const target = process.env.REACT_APP_GRAPHQL_API;

export default withIronSessionApiRoute(
  async function handler(req, res) {
    const token = (req.session as any).token;
    console.log({ token });
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
    password: "complex_password_at_least_32_characters_long",

    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
