import { useField } from "formik";

const TextAnswer = ({ name }: { name: string }) => {
  const [, { value: score }] = useField("score");
  const [, { value }, helpers] = useField(name);

  return (
    <>
      <h6 className="mb-2">
        {score <= 6
          ? "What was the main reason for your score? How can we improve?"
          : score <= 8
          ? "What could we have done differently to improve your experience?"
          : "What did you like most about your visit?"}
      </h6>
      <textarea
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        rows={5}
        name={name}
        value={value}
        onChange={(e) => helpers.setValue(e.target.value)}
      />
    </>
  );
};

export default TextAnswer;
