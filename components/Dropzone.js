import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const MyDropzone = ({ input }) => {
  const onDrop = useCallback((acceptedFiles) => {
    input.onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>Upload BO here</p>}
    </div>
  );
};

export default MyDropzone;
