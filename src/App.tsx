import { ChangeEvent, useState } from "react";
import "./App.css";
import WordRow, { LETTER_LENGTH } from "./components/WordRow";
import { useWordContext } from "./context/wordContext";

const GUESS_LENGTH = 6;

function App() {
  const context = useWordContext();
  const [guess, setGuess] = useState("");

  // const numberOfGuessesRemaining = GUESS_LENGTH - context.guesses.length;

  let rows = [
    ...context.guesses,
    // ...Array(numberOfGuessesRemaining).fill(""),
  ];

  if (rows.length < GUESS_LENGTH) {
    rows.push(guess);
  }

  const numberOfGuessesRemaining = GUESS_LENGTH - rows.length;
  rows = rows.concat(Array(numberOfGuessesRemaining).fill(""));

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newGuess = e.target.value;

    if (newGuess.length === LETTER_LENGTH) {
      context.addGuess(newGuess);
      setGuess("");
      return;
    }
    setGuess(newGuess);
  };

  return (
    <div className="mx-auto w-96">
      <header className="border-b border-white pb-2 my-2">
        <h1 className="text-4xl text-center">Wordle</h1>
      </header>
      <main className="grid grid-rows-6 gap-4">
        {rows.map((word, i) => (
          <WordRow key={i} letters={word} />
        ))}
      </main>

      <input
        type="text"
        className="w-1/2 p-2 m-4 border-2 border-white"
        value={guess}
        onChange={changeHandler}
      />
    </div>
  );
}

export default App;
