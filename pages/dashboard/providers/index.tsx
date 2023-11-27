import { Layout } from "@src/components/layouts/Layout";
import { AllProviders } from "@src/components/admin/providers/tabs";

function Providers() {
  return <AllProviders />;
}

Providers.isAuthRequired = true;
Providers.getLayout = (page: React.ReactNode) => (
  <Layout title="Providers">{page}</Layout>
);

export default Providers;
