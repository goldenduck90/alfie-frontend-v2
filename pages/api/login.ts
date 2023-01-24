import { withIronSessionApiRoute } from "iron-session/next";

const loginMutation = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        _id
        name
        email
        role
        eaProviderId
      }
    }
  }
`;

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    const { email, password, rememberMe } = req.body;
    if (email === "" || password === "") {
      return res.status(400).json({
        message: "Invalid inputs expected non-empty email / password",
      });
    }

    const body = JSON.stringify({
      query: loginMutation,
      variables: {
        input: {
          email: email,
          password: password,
        },
      },
    });

    const response = await fetch(`${process.env.REACT_APP_GRAPHQL_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
    });

    if (response.ok) {
      const { data } = await response.json();
      (req.session as any).token = data.login.token;
      (req.session as any).user = data.login.user;

      await req.session.save();
      return res.json({ user: data.login.user });
    }

    return res.status(401).json({ message: "Invalid credentials" });
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
