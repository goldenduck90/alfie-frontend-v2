import { withIronSessionApiRoute } from "iron-session/next";
import { withSessionRoute } from "lib/withSession";

const loginMutation = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        _id
        textOptIn
        classifications {
          classification
          percentile
          displayPercentile
          date
        }
        meetingRoomUrl
        name
        email
        phone
        role
        dateOfBirth
        weightGoal
        weights {
          value
          date
        }
        gender
        heightInInches
        akutePatientId
        stripeCustomerId
        stripeSubscriptionId
        eaCustomerId
        eaHealthCoachId
        subscriptionExpiresAt

        provider {
          _id
          type
          akuteId
          eaProviderId
          npi
          licensedStates
          firstName
          lastName
          email
          numberOfPatients
          password
          emailToken
          emailTokenExpiresAt
        }
        pharmacyLocation
        meetingUrl
        labOrderSent
        bmi
      }
    }
  }
`;

export default withSessionRoute(async function loginRoute(req, res) {
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

  console.log({ response });

  if (response.ok) {
    const { data } = await response.json();
    if (!data) {
      return res
        .status(401)
        .json({ message: "Invalid credentials! Please try again." });
    }

    (req.session as any).token = data.login.token;
    (req.session as any).user = data.login.user;

    await req.session.save();
    return res.json({ user: data.login.user });
  }

  return res
    .status(401)
    .json({ message: "Invalid credentials! Please try again." });
});
