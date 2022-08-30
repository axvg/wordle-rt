import React, { Dispatch, useEffect, useState } from "react";

export default function useGuess(): [
  string,
  Dispatch<React.SetStateAction<string>>
] {
  const [guess, setGuess] = useState("");

  const onKeyDown = (e: KeyboardEvent) => {
    setGuess((currGuess) => {
      let letter = e.key;
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
          console.log("newGuess", newGuess);
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

  return [guess, setGuess];
}
