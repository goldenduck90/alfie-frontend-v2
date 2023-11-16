import { Role } from "@src/graphql/generated";
import { withSessionRoute } from "lib/withSession";

// ?note: needs to be done this way because of the way the graphql api is set up
const getPatientInfo = `
query Me {
  me {
    _id
    address {
      line1
      line2
      city
      state
      postalCode
      country
    }
    textOptIn
    meetingRoomUrl
    name
    email
    phone
    role
    dateOfBirth
    weights {
      value
      date
    }
    gender
    heightInInches
    hasScale
    akutePatientId
    stripeCustomerId
    stripeSubscriptionId
    eaCustomerId
    eaHealthCoachId
    metriportUserId
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
    }
    pharmacyLocation
    meetingUrl
    labOrderSent
    bmi
  }
}
`;

const getPatientInfoV2 = `
query Me {
  me {
    _id
    address {
      line1
      line2
      city
      state
      postalCode
      country
    }
    textOptIn
    meetingRoomUrl
    name
    email
    phone
    role
    dateOfBirth
    weights {
      value
      date
    }
    gender
    heightInInches
    hasScale
    akutePatientId
    stripeCustomerId
    stripeSubscriptionId
    eaCustomerId
    eaHealthCoachId
    metriportUserId
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
    }
    pharmacyLocation
    meetingUrl
    labOrderSent
    bmi
  }
}
`;


const partialUserLoginMutation = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        _id
        name
        email
        role
        eaProviderId
        eaHealthCoachId
      }
    }
  }`;

export default withSessionRoute(async function loginRoute(req, res) {
  const { email, password, rememberMe } = req.body;
  if (email === "" || password === "") {
    return res.status(400).json({
      message: "Invalid inputs expected non-empty email / password",
    });
  }

  const body = JSON.stringify({
    query: partialUserLoginMutation,
    variables: {
      input: {
        email: email,
        password: password,
      },
    },
  });

  const response = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body,
  });
  console.log(response, "response");
  if (response.ok) {
    const { data } = await response.json();
    console.log(data, "data");
    if (!data) {
      return res
        .status(401)
        .json({ message: "Invalid credentials! Please try again." });
    }
    console.log(data.login, "data.login in login.ts");
    (req.session as any).token = data.login.token;
    (req.session as any).user = data.login.user;

    if (data.login.user.role === Role.Patient) {
      const patientBody = JSON.stringify({
        query: getPatientInfo,
        variables: {},
      });

      const userData = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${data.login.token}`,
        },
        body: patientBody,
      });

      const patientData = await userData.json();

      if (!data) {
        return res
          .status(401)
          .json({ message: "Invalid credentials! Please try again." });
      }

      if (patientData?.data?.me) {
        // Clone the object to avoid modifying the original data
        const userData = { ...patientData.data.me };

        // Delete the weights array
        delete userData.weights;

        // Assign the modified object to the session user
        (req.session as any).user = userData;
      }
      await req.session.save();
      return res.json({ user: patientData?.data?.me });
    }

    await req.session.save();
    return res.json({ user: data.login.user });
  }

  return res
    .status(401)
    .json({ message: "Invalid credentials! Please try again." });
});
