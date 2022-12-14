import React, { Dispatch, useEffect, useState } from "react";

export default function useGuess(): [
  string,
  Dispatch<React.SetStateAction<string>>,
  (letter: string) => void
] {
  const [guess, setGuess] = useState("");

  const addGuessLetter = (letter: string) => {
    setGuess((currGuess) => {
      const newGuess =
        letter.length === 1 && currGuess.length !== 5
          ? currGuess + letter
          : currGuess;

      switch (letter) {
        case "Backspace":
          return newGuess.slice(0, -1);
        case "Enter":
          if (newGuess.length === 5) {
            return "";
          }
      }

      if (currGuess.length === 5) {
        return currGuess;
      }
      return newGuess;
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    let letter = e.key;
    addGuessLetter(letter);
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return [guess, setGuess, addGuessLetter];
}
