import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function sessionRoute(req, res) {
    return res.json({ user: (req.session as any).user });
  },
  {
    cookieName: "Alfie:sessionCookie",
    //Todo: password should be environment driven
    password: "complex_password_at_least_32_characters_long",

    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
