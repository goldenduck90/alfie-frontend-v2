import { Layout } from "@src/components/layouts/Layout";
import { Button } from "@src/components/ui/Button";
import { DashboardCard } from "@src/components/ui/DashboardCard";
import Link from "next/link";

function Custom404() {
  return (
    <DashboardCard className="text-center h-full">
      <p className="text-base font-semibold text-brand-berry">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-6 text-base leading-7 text-gray-600">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link href="/dashboard" passHref legacyBehavior>
          <Button>Go back home</Button>
        </Link>
      </div>
    </DashboardCard>
  );
}

Custom404.getLayout = (page: React.ReactNode) => (
  <Layout title="Page Not Found">{page}</Layout>
);

export default Custom404;
