import React from "react";
import classes from "./ViewCodeContainer.module.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import {anOldHope} from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface Props {
  code: string;
  language: string;
}

function ViewCodeContainer({ code, language }: Props) {
  console.log(code);

  return (
    <div className={classes.MainContainer}>
      <SyntaxHighlighter
        language={language}
        style={anOldHope}
        customStyle={{
          fontSize: "30px",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default ViewCodeContainer;