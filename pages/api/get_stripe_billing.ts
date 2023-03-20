import * as Sentry from "@sentry/react";
import { withSessionRoute } from "lib/withSession";
const axios = require("axios");
const qs = require("qs");

export default withSessionRoute(async function handler(req: any, res: any) {
  const sessionUrl = `${process.env.NEXT_PUBLIC_STRIPE_URL}/billing_portal/sessions`;

  try {
    if (!req.body.stripeCustomer) {
      return res.status(400).json({
        message: "Invalid inputs expected non-empty stripeCustomer",
      });
    }
    const session = await axios.post(
      sessionUrl,
      qs.stringify({
        customer: req.body.stripeCustomer,
        return_url:
          "http://develop.platform.joinalfie.com.s3-website-us-east-1.amazonaws.com/billing",
      }),
      {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    const sessionData = session.data;
    res.status(200).json({ stripeSessionData: sessionData });
  } catch (err) {
    console.log({ err });
    Sentry.captureException(new Error(err as any), {
      tags: {
        query: "createUserStripeSession",
        component: "Billing",
      },
    });
    res.status(500).json({ err });
  }
});
