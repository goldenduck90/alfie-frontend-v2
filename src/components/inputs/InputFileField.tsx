import { ControllerRenderProps } from "react-hook-form";

/** Maximum file size for image uploads. */
export const maxFileSize = Number(process.env.MAX_UPLOAD_SIZE) || 1e7; // bytes

export const validMIMETypes = ["image/png", "image/jpeg", "application/pdf"];

/** A form input for uploading a file in react-hook-form components. */
export function InputFileField({
  field,
  children,
  onUploadFile,
  getValue,
  error,
  multi = false,
}: {
  field: ControllerRenderProps<any, any>;
  /** Optional content for the upload box. */
  children?: JSX.Element;
  /**
   * Transform the file synchronously or asynchronously into a value to
   * save on the field.
   */
  getValue?: (file: File) => any | Promise<any>;
  /**
   * A side-effect once the file has been selected.
   * Passes the `file` as the first parameter, and `value`
   * if `getValue` is defined.
   */
  onUploadFile?: (file: File, value: any) => void;
  error?: string | null;
  /** Whether to allow multiple-file uploads. */
  multi: boolean;
}) {
  const getValueFunction = getValue ?? ((file: File) => ({
    value: file?.name,
    file,
  }));

  const { onChange, value, name, ref, ...inputProps } = field;
  console.log("InputFileField props", field)

  return (
    <div className="relative w-full py-6 border rounded-md border-dashed border-blue-600 bg-primary-50 min-h-[276px] flex justify-center items-center">
      {/** Hidden input stores the form value, which differs from the default for HTMLFileInput. */}
      <input
        {...inputProps}
        type="hidden"
        value={value?.name ?? value ?? null}
        name={name}
      />
      <input
        type="file"
        className="absolute inset-0 opacity-0"
        onChange={async (e) => {
          const allFiles = Array.from(e.target?.files ?? []);
          const files = multi ? allFiles : allFiles.slice(0, 1);

          const updatedValues = await Promise.all(
            files.map(async (file) => {
              if (file && validMIMETypes.includes(file.type)) {
                const updatedValue = await getValueFunction(file);
                if (onUploadFile) {
                  await onUploadFile(file, updatedValue);
                }
                return updatedValue;
              }
            })
          )

          if (multi) {
            const combinedValues =
              typeof updatedValues[0] === "object"
                ? updatedValues
                : updatedValues.join(",")
            onChange(combinedValues);
          } else {
            onChange(updatedValues[0])
          }
        }}
        accept={validMIMETypes.join(", ")}
      />

      {error && <div className="text-red-500 text-md mt-2">{error}</div>}
      {children}
    </div>
  );
}
