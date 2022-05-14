import React, {useEffect} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {anOldHope} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import {Button, Typography} from "@mui/material";
import classes from "./CodeInput.module.css";
import {Word} from "./Datastructures/Word";
import {Language} from "../../utils/Types/GameTypes";

interface Props {
  started: boolean;
  checkKeyPressed: (correct: boolean) => void;
  code: string;
  onGameOver: () => void;
  setProgress: (progress: number) => void;
  language?: Language;
}

function CodeInput({started, checkKeyPressed, code, onGameOver, setProgress, language = "javascript"}: Props) {
  const codeRef = React.useRef<any>();

  const [words, setWords] = React.useState<Word[]>([]);
  const [wordIndex, setWordIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);

  const [showEnterMessage, setShowEnterMessage] = React.useState(false);

  const [inFocus, setInFocus] = React.useState(false);

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
    if (!started) {
      return;
    }

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

    const correct = words[finalWordIndex].add(finalCharIndex, key);
    checkKeyPressed(correct);

    if (words[finalWordIndex].letterTags.length <= finalCharIndex + 1) {
      if (finalWordIndex + 1 >= words.length) {
        onGameOver();

        setProgress(calculateProgress());

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

    setProgress(calculateProgress());

    return {
      finalWordIndex,
      finalCharIndex
    };
  }

  const calculateProgress = () => {
    let currentProgress = 0;

    for (let i = 0; i < wordIndex; i++) {
      currentProgress += words[i].getLength();
    }

    currentProgress += charIndex + 1;

    let totalLength = 0;
    for (let i = 0; i < words.length; i++) {
      totalLength += words[i].getLength();
    }

    return (currentProgress / totalLength) * 100;
  }

  return (
    <div
      style={{outline: "none", width: "100%", position: "relative", marginTop: 20, marginBottom: 20}}
      tabIndex={-1}
      onKeyDown={(e) => {e.preventDefault();onKeyDown(e.key);}}
      onFocus={() => setInFocus(true)}
      onBlur={() => setInFocus(false)}
    >

      {
        !inFocus &&
        <Typography style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: 25, zIndex: 10}}>
          Click to focus
        </Typography>
      }

      <div style={{textAlign: "center", height: 15, marginBottom: 15}}>{showEnterMessage && <Typography>Press Enter to continue</Typography>}</div>
      <SyntaxHighlighter
        language={language}
        style={anOldHope}
        customStyle={{
          backgroundColor: "#1F1F1F",
          fontSize: 28,
          paddingLeft: 30,
          paddingRight: 30,
          paddingBottom: 30,
          margin: 0,
          filter: !inFocus ? "blur(5px)" : "none"
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