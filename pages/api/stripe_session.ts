const stripe = require("stripe")(
  "sk_test_51K4tkPDOjl0X0gOqWcyjvCHlkdptYesL7ftuKxd9luFemEWGzxRX1SUbCmcJvknVeg5Le5zGSdW4Oivj3YdgeWq400xp2gTQJ7",
  { apiVersion: "2022-08-01; embedded_connect_beta=v1" }
);

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
      res.send({ error: error?.message });
    }
  }
}
