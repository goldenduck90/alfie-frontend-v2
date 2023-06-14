import { gql, useMutation } from "@apollo/client";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { Button } from "@src/components/ui/Button";
import { Loading } from "../old/Loading";

const generateMetriportConnectUrlMutation = gql`
  mutation GenerateMetriportConnectUrl($userId: String!) {
    generateMetriportConnectUrl(userId: $userId) {
      url
    }
  }
`;

export const ConnectWithings = () => {
  const { user } = useCurrentUserStore();
  const [generateMetriportConnectUrl, { loading, error }] = useMutation(
    generateMetriportConnectUrlMutation
  );

  const handleConnectClick = async () => {
    console.log(user);
    if (user?._id) {
      const { data } = await generateMetriportConnectUrl({
        variables: { userId: user._id },
      });

      if (data.generateMetriportConnectUrl?.url && !error) {
        window.open(
          data.generateMetriportConnectUrl.url,
          "metriportConnect",
          "width=600,height=800"
        );
      }
    }
  };

  return (
    <div>
      <Button
        disabled={loading || !!user?.hasScale}
        onClick={handleConnectClick}
      >
        <span>{user?.hasScale ? "Connected" : "Connect"}</span>
        <div className="absolute">{loading && <Loading size={24} />}</div>
      </Button>
    </div>
  );
};

export default ConnectWithings;
