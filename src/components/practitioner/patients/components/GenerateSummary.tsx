import { Button } from "@src/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { Patient } from "../../dashboard/Table";

export function GenerateSummary({ patient }: { patient: Patient }) {
  const { mutate, isLoading, data } = useMutation(async () => {
    /* ... */
  });

  const handleGenerate = () => {
    mutate();
  };

  return (
    <div className="w-full mt-6">
      <div className="flex justify-between">
        <h3 className="mb-6 text-xl font-bold">Generate Summary OpenAI</h3>
        <Button onClick={handleGenerate} disabled={isLoading}>
          Generate
        </Button>
      </div>
      <div className="bg-white border rounded-xl p-6">
        {(!data || !isLoading) && (
          <p className="text-gray-500">
            Click generate and you will see a summary of {patient?.name} from
            Open AI
          </p>
        )}
        <p className="">incoming data goes here</p>
      </div>
    </div>
  );
}
