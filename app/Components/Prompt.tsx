'use client';
import { useState } from 'react';

type PromptProps = {
  mode: React.CSSProperties;
  sendPrompt: (prompt: string, fileContent: string) => void;
  response: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearFileName: (event: React.SyntheticEvent) => void;
  fileName: string;
  fileContent: string;
};

export default function Prompt({ mode, sendPrompt, response, handleFileChange, fileName, clearFileName, fileContent }: PromptProps) {
  const [prompt, setPrompt] = useState('');

  const handleSend = () => {
    console.log("Sending Prompt:", prompt);
    console.log("With File Content:", fileContent);
    sendPrompt(prompt, fileContent);
  };

  return (
    <div className="container">
      <div className="mb-3" style={{ color: 'white', fontSize: 20 }}>
        <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            style={{ color: '#4A90E2' }}
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
          </svg>
        </label>

        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <br>
        </br>
        {fileName && (
          <>
            <b>Current File: {fileName}</b>
            <br></br>
            <button className="btn btn-primary mt-3" onClick={clearFileName}>
              Clear
            </button>
          </>
        )}


      </div>
      <div className="mb-3">
        <label htmlFor="promptBox" className="form-label" style={{ color: 'white', fontSize: 20 }}>
          Enter your Prompt:
        </label>
        <textarea
          className="form-control"
          id="promptBox"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <button className="btn btn-primary mt-3" onClick={handleSend}>
          Send
        </button>
      </div>
      {response && (
        <div className="mt-4 p-3 rounded" style={{ backgroundColor: '#444', color: 'white' }}>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}


{/*import React from 'react'

type PromptProps = {
  mode: React.CSSProperties
};

export default function Prompt({mode}: PromptProps) {
    return (
        <div className="col-md-6 mx-auto">
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label" style={{color: "white", fontSize: 24}}>Enter your Prompt:</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
            </div>
        </div>
    )
} */}
