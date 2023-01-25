import { User } from "@src/graphql/generated";
import { useSession } from "@src/hooks/useUserSession";
import React from "react";

const App = (props: { user: User | undefined }) => {
  if (props.user) {
  }
  return null;
};

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:3000/api/session", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { user } = await res.json();
  console.log({ user });
  return {
    props: { user: null }, // will be passed to the page component as props
  };
}

export default App;
