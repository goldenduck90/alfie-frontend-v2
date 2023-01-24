import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function logoutRoute(req, res) {
    req.session.destroy();
    return res.json({ message: "Logged out" });
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
