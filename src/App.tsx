import { useEffect, useState } from "react";
import "./App.css";
import Keyboard from "./components/Keyboard";
import WordRow from "./components/WordRow";
import { gameStateEnum, useWordContext } from "./context/wordContext";
import { isValidWord, LETTER_LENGTH } from "./wordUtils";
import useGuess from "./hooks/useGuess";
import usePrevious from "./hooks/usePrevious";

export const GUESS_LENGTH = 6;

function App() {
  const context = useWordContext();
  const [guess, setGuess, addGuessLetter] = useGuess();
  const [showInvalidGuess, setInvalidGuess] = useState(false);

  useEffect(() => {
    let id: any;
    if (showInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 2000);
    }

    return () => clearTimeout(id);
  }, [showInvalidGuess]);

  const { addGuess } = useWordContext();
  const previousGuess = usePrevious(guess);

  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === LETTER_LENGTH) {
      if (isValidWord(previousGuess)) {
        setInvalidGuess(false);
        addGuess(previousGuess);
      } else {
        setInvalidGuess(true);
        setGuess(previousGuess);
      }
    }
  }, [guess]);

  const isGameOver = context.gameState !== gameStateEnum.playing;

  let rows = [...context.guesses];

  let currentRow = 0;

  if (rows.length < GUESS_LENGTH) {
    currentRow = rows.push({ guess }) - 1;
  }

  const numberOfGuessesRemaining = GUESS_LENGTH - rows.length;

  rows = rows.concat(Array(numberOfGuessesRemaining).fill(""));

  return (
    <div className="mx-auto w-96 relative h-screen">
      <header className="border-b border-white pb-2 my-2">
        <h1 className="text-4xl text-center">Wordle</h1>
      </header>

      <main className="grid grid-rows-6 gap-4 mb-4">
        {rows.map(({ guess, result }, i) => (
          <WordRow
            key={i}
            letters={guess}
            result={result}
            className={
              showInvalidGuess && currentRow === i ? "animate-bounce" : ""
            }
          />
        ))}
      </main>

      <Keyboard
        onClick={(letter) => {
          addGuessLetter(letter);
        }}
      />

      {isGameOver && (
        <div
          role="modal"
          className="absolute bg-white rounded border border-black left-0 right-0 top-1/4 p-6 w-3/4 mx-auto text-center text-black"
        >
          Game Over!
          <WordRow
            letters={context.answer}
            className="items-center justify-items-center"
          />
          <button
            className="block border rounded border-black bg-green-500 p-2 mt-4 mx-auto shadow"
            onClick={() => {
              context.newGame();
              setGuess("");
            }}
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
