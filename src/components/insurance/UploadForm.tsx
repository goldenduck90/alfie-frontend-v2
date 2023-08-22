/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@src/components/ui/Button";
import { IconButton } from "../IconButton";
import { TrashIcon } from "@heroicons/react/outline";
import { Loading } from "../Loading";

type UploadFormProps = {
  insuranceCard: File | null;
  onInsuranceCardChange: (f: File | null) => void;
  onUpload: () => Promise<void>;
};
const UploadForm = ({
  insuranceCard,
  onInsuranceCardChange,
  onUpload,
}: UploadFormProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>();

  const onDrop = useCallback((acceptedFiles: any) => {
    onInsuranceCardChange(acceptedFiles[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (insuranceCard) {
      setPreview(URL.createObjectURL(insuranceCard));
    }
  }, [insuranceCard]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 20000000,
    onDrop,
  });

  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    onInsuranceCardChange(null);
  };

  const handleUploadClick = async () => {
    setUploading(true);
    try {
      await onUpload();
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        {...getRootProps()}
        className="w-full h-64 flex justify-center items-center border-2 border-dashed text-gray-500 p-4 rounded-lg"
      >
        <input {...getInputProps()} />
        {insuranceCard === null ? (
          <p>Upload front of your insurance card</p>
        ) : (
          <div>
            <div
              className="w-full h-60 relative rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={preview} className="object-contain w-full h-full" />
              <IconButton
                icon={TrashIcon}
                className="absolute top-3 right-3 z-10 w-6 h-6 bg-white rounded flex justify-center items-center shadow-2xl"
                onClick={(e) => handleRemoveClick(e)}
              />
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex justify-center">
        <Button
          type="submit"
          size="medium"
          disabled={insuranceCard === null}
          onClick={handleUploadClick}
        >
          {uploading ? <Loading size={20} /> : "Upload"}
        </Button>
      </div>
    </div>
  );
};

export default UploadForm;
