import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {anOldHope} from "react-syntax-highlighter/dist/esm/styles/hljs";

interface WelcomeCodeProps {
  code: string;
  language: string;
}

function WelcomeCode({code, language}: WelcomeCodeProps) {
  return <SyntaxHighlighter
    language={language}
    style={anOldHope}
    customStyle={{
      // Just edit these styles for when making the home page
      fontSize: "30px",
    }}
  >
    {code}
  </SyntaxHighlighter>
}

export default WelcomeCode;