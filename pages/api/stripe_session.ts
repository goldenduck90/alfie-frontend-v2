const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01; embedded_connect_beta=v1",
});

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const accountSession = await stripe.accountSessions.create({
        account: "acct_1K4tkPDOjl0X0gOq",
      });

      res.json({
        client_secret: accountSession.client_secret,
      });
    } catch (error) {
      console.error(
        "An error occurred when calling the Stripe API to create an account session",
        error
      );
      res.status(500);
      res.send({ error: (error as any)?.message });
    }
  }
}
