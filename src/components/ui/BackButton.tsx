import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

export const BackButton = (props: {
  href?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
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
      className="border rounded-xl border-brand-berry-tint-2 p-2"
      onClick={handleBack}
    >
      {props.icon ? (
        <props.icon className="h-5 w-5 text-white" />
      ) : (
        <ChevronLeftIcon className="h-5 w-5 text-white" />
      )}
    </button>
  );
};
