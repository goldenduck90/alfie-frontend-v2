import { gql, useMutation } from "@apollo/client";
import { useCurrentUserStore } from "@src/hooks/useCurrentUser";
import { Button } from "@src/components/ui/Button";
import { Loading } from "@src/components/Loading";

const generateMetriportConnectUrlMutation = gql`
  mutation GenerateMetriportConnectUrl($userId: String!) {
    generateMetriportConnectUrl(userId: $userId) {
      url
    }
  }
`;

export const ConnectWithingsButton = () => {
  const { user } = useCurrentUserStore();
  const [generateMetriportConnectUrl, { loading, error }] = useMutation(
    generateMetriportConnectUrlMutation
  );

  const handleConnectClick = async () => {
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
    <Button size="medium" disabled={loading} onClick={handleConnectClick}>
      <span>Connect</span>
      <div className="absolute">{loading && <Loading size={24} />}</div>
    </Button>
  );
};

export default ConnectWithingsButton;
