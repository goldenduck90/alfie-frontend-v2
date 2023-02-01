import { useRouter } from "next/router";

export const BackButton = (props: {
  href?: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}) => {
  const router = useRouter();
  const handleBack = () => {
    if (props.href) {
      router.push(props.href);
    } else {
      router.back();
    }
  };

  return (
    <button
      className="border border-brand-berry-tint-2 py-2 px-3"
      onClick={handleBack}
    >
      <props.icon className="h-5 w-5 text-white" />
    </button>
  );
};
