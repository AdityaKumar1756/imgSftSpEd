'use client';
import { useState } from "react";

import Navbar from "./Components/Navbar";
import Prompt from "./Components/Prompt";
import { Content } from "next/font/google";

export default function Home() {

  const [response, setResponse] = useState("");

  const sendPrompt = async (userPrompt: string, userText: string) => {
    const res = await fetch("/api/ollama", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: userPrompt,
        fileContent: userText,
      }),
    });

    const data = await res.json();
    setResponse(data.response);
  };


  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    else {
      setFileName(file.name);
      console.log("File name: ", file.name);

      if (file.type === "application/pdf") {
        // For PDF files, we'll need server-side processing
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        console.log("Server response:", result);

        if (result.content) {
          setFileContent(result.content);
        }
      }
      else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const fileReader = event.target as FileReader;
          if (!fileReader?.result) return;

          const content = fileReader.result as string;
          setFileContent(content);
          console.log(content);
        }
        reader.readAsText(file)
      }
    }
  };

  const clearFileName = () => {
    setFileName("");
    setFileContent("");
  };

  const [mode] = useState({
    backgroundColor: "black",
    color: "white",
  });

  return (
    <>
      <div style={{ backgroundColor: "#323131" }} className="min-h-screen" >
        <Navbar mode={mode} />
        <div style={{ marginTop: 100 }}>
          <Prompt sendPrompt={sendPrompt} response={response} handleFileChange={handleFileChange} fileName={fileName} clearFileName={clearFileName} fileContent={fileContent} />
        </div>
      </div>
    </>
  );
}