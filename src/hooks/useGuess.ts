import React, { Dispatch, useEffect, useState } from "react";
import { useWordContext } from "../context/wordContext";
import usePrevious from "./usePrevious";

export default function useGuess(): [
  string,
  Dispatch<React.SetStateAction<string>>
] {
  const [guess, setGuess] = useState("");
  const { addGuess } = useWordContext();
  const previousGuess = usePrevious(guess);

  const onKeyDown = (e: KeyboardEvent) => {
    let letter = e.key;
    console.log(letter);
    setGuess((currGuess) => {
      const newGuess = letter.length === 1 ? currGuess + letter : currGuess;

      switch (letter) {
        case "Backspace":
          return newGuess.slice(0, -1);
        case "Enter":
          if (newGuess.length === 5) {
            addGuess(newGuess);
            return "";
          }
      }

      if (currGuess.length === 5) {
        return currGuess;
      }
      return newGuess;
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === 5) {
      addGuess(previousGuess);
    }
  }, [guess]);

  return [guess, setGuess];
}
