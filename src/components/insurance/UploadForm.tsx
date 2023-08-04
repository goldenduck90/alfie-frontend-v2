/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@src/components/ui/Button";
import { IconButton } from "../IconButton";
import { TrashIcon } from "@heroicons/react/outline";
import { Loading } from "../Loading";

import { gql, useMutation } from "@apollo/client";
import { createS3key } from "@src/utils/upload";

const requestSignedUrlsMutation = gql`
  mutation RequestSignedUrls($requests: [SignedUrlRequest!]!) {
    requestSignedUrls(requests: $requests) {
      url
      key
    }
  }
`;

const UploadForm = ({ name }: { name: string }) => {
  const [requestSignedUrls] = useMutation(requestSignedUrlsMutation);

  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    setFiles(
      acceptedFiles.map((file: File) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    multiple: false,
    minSize: 100000,
    maxSize: 20000000,
    onDrop,
  });

  const handleFileRemove = (e: any, file: any) => {
    e.stopPropagation();
    setFiles(files.filter((f: any) => f.name !== file.name));
  };

  const handleUploadClick = async () => {
    setUploading(true);
    try {
      const insurancePhotoKey = createS3key({
        fileName: "INSURANCE_CARD",
        fileType: `${files[0].name.split(".").pop()}`,
        folder: name.replace(" ", "_").toLowerCase(),
      });
      const uploadRequest = [
        {
          key: insurancePhotoKey,
          metadata: [
            {
              key: "DOCUMENT_TYPE",
              value: "INSURANCE_CARD",
            },
          ],
          contentType: files[0].type,
        },
      ];

      const { data } = await requestSignedUrls({
        variables: {
          requests: uploadRequest,
        },
      });

      const { key, url } = data.requestSignedUrls[0];

      const uploadResponse = await fetch(url, {
        method: "PUT",
        headers: {
          ["Content-Type"]: files[0].type || "",
        },
        body: files[0],
      });

      console.log(uploadResponse);
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
        {files.length === 0 ? (
          <p>Upload front of your insurance card</p>
        ) : (
          <div>
            {files.map((file: any) => (
              <div
                key={file.name}
                className="w-full h-60 relative rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={file.preview}
                  className="object-contain w-full h-full"
                />
                <IconButton
                  icon={TrashIcon}
                  className="absolute top-3 right-3 z-10 w-6 h-6 bg-white rounded flex justify-center items-center shadow-2xl"
                  onClick={(e) => handleFileRemove(e, file)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-full flex justify-center">
        <Button
          type="submit"
          size="medium"
          disabled={files.length === 0}
          onClick={handleUploadClick}
        >
          {uploading ? <Loading size={20} /> : "Upload"}
        </Button>
      </div>
    </div>
  );
};

export default UploadForm;
