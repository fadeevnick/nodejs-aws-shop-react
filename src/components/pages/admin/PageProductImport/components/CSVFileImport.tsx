import React from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();
  const [error, setError] = React.useState<string>("");
  const [isUploading, setIsUploading] = React.useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
      setError("");
    }
  };

  const removeFile = () => {
    setFile(undefined);
    setError("");
  };

  const uploadFile = async () => {
    if (!file) {
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const response = await axios.get<string>(url, {
        params: {
          name: file.name,
        },
      });

      await fetch(response.data, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type || "text/csv",
        },
      });

      setFile(undefined);
    } catch {
      setError("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload file"}
          </button>
        </div>
      )}
      {error ? <Typography color="error">{error}</Typography> : null}
    </Box>
  );
}
