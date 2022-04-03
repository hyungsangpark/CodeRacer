import React, {useEffect} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {anOldHope} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {Button, Typography} from "@mui/material";
import classes from "./CodeInput.module.css";
import {Word} from "./Datastructures/Word";

interface Props {
}

function CodeInput() {
  const [code, setCode] = React.useState(`const function(){
  const test = 1;
};`);
  const codeRef = React.useRef<any>();

  const [words, setWords] = React.useState<Word[]>([]);
  const [wordIndex, setWordIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);

  const [showEnterMessage, setShowEnterMessage] = React.useState(false);

  useEffect(() => {
    const codeChildren = codeRef.current.childNodes;
    const codeTextNodes = Array.from(codeChildren).filter((child: any) => child.nodeName !== "SPAN");

    codeTextNodes.forEach((node: any) => {
      const span = document.createElement("span");
      span.textContent = node.textContent;
      node.parentNode.replaceChild(span, node);
    });

    const allSpans = Array.from(codeRef.current.childNodes);

    const newWords: Word[] = [];
    allSpans.forEach((span: any) => {
      newWords.push(new Word(span));
    });

    newWords[0].setCursor(0);

    setWords(newWords);
  }, [codeRef]);

  const onKeyDown = (keyValue: string) => {
    setShowEnterMessage(false);

    if (keyValue === "Backspace") {
      if (wordIndex <= 0 && charIndex <= 0) {
        return;
      }

      if (charIndex === 0) {
        const wordToRemoveFrom = words[wordIndex - 1];
        const prevWordLength = words[wordIndex - 1].getLength();

        words[wordIndex].remove(charIndex);
        wordToRemoveFrom.setCursor(prevWordLength - 1);

        setWordIndex(wordIndex - 1);
        setCharIndex(prevWordLength - 1);
      } else {
        words[wordIndex].remove(charIndex);
        words[wordIndex].setCursor(charIndex - 1);

        setCharIndex(charIndex - 1);
      }

    } else if (words[wordIndex].isNewLineCharacter(charIndex)) {
      if (keyValue !== "Enter") {
        setShowEnterMessage(true);
        return;
      }

      words[wordIndex].letterTags[charIndex].setAsCorrect();
      words[wordIndex + 1].setCursor(0);

      setWordIndex(wordIndex + 1);
      setCharIndex(0);
    } else if (keyValue === "Tab") {
      const first = addKey(wordIndex, charIndex, " ");

      if (words[first.finalWordIndex].isNewLineCharacter(first.finalCharIndex)) {
        setWordIndex(first.finalWordIndex);
        setCharIndex(first.finalCharIndex);

        return;
      }

      const {finalWordIndex, finalCharIndex} = addKey(first.finalWordIndex, first.finalCharIndex, " ");

      setWordIndex(finalWordIndex);
      setCharIndex(finalCharIndex);

    } else if (keyValue !== "Shift") {
      const {finalWordIndex, finalCharIndex} = addKey(wordIndex, charIndex, keyValue);

      setWordIndex(finalWordIndex);
      setCharIndex(finalCharIndex);
    }
  }

  const addKey = (wordIndex: number, charIndex: number, key: string) => {
    let finalWordIndex = wordIndex;
    let finalCharIndex = charIndex;

    words[finalWordIndex].add(finalCharIndex, key);

    if (words[finalWordIndex].letterTags.length <= finalCharIndex + 1) {
      if (finalWordIndex + 1 >= words.length) {
        // END OF GAME LOGIC WILL GO HERE
        // potentially give them opportunity to go back and fix their mistakes?

        console.log("end of game logic");

        return {
          finalWordIndex,
          finalCharIndex
        };
      }

      words[finalWordIndex + 1].setCursor(0);

      finalWordIndex = finalWordIndex + 1;
      finalCharIndex = 0;

    } else {
      words[finalWordIndex].setCursor(finalCharIndex + 1);
      finalCharIndex++;
    }

    return {
      finalWordIndex,
      finalCharIndex
    };
  }

  return (
    <div style={{ outline: "none", }} tabIndex={-1} onKeyDown={(e) => {
      e.preventDefault();

      onKeyDown(e.key);
    }}>
      {showEnterMessage && <Typography>Press Enter to continue</Typography>}
      <SyntaxHighlighter
        language="javascript"
        style={anOldHope}
        customStyle={{
          backgroundColor: "#1F1F1F",
          fontSize: "30px",
        }}
        codeTagProps={
          {
            ref: codeRef,
          }
        }
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeInput;