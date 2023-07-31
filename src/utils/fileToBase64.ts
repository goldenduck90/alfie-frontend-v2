/** Converts a file upload to a base64 string. */
export const fileToBase64 = (
  /** The file to convert to base64 string. */
  file: Blob,
  /**
   * Whether to include file metadata in the string for
   * use as a Data URL. Defaults to true. If false,
   * only includes the base64 data part of the string.
   */
  includeMetadata: boolean = true
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file)
      return new Promise((resolve, reject) => reject(new Error("Missing file parameter.")));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64 = reader.result?.toString();
      if (base64) {
        if (!includeMetadata) {
          base64 = base64.split(",")[1]!
        }
        resolve(base64);
      } else {
        reject(new Error("Unable to convert file to base64"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
