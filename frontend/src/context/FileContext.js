// frontend/src/context/FileContext.js
import { createContext, useContext, useState } from "react";

// Create context
const FileContext = createContext();

// Hook to use context
export const useFileContext = () => useContext(FileContext);

// Provider to wrap your app
export const FileProvider = ({ children }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  return (
    <FileContext.Provider value={{ uploadedFiles, setUploadedFiles }}>
      {children}
    </FileContext.Provider>
  );
};
