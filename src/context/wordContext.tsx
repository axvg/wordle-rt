import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { computeGuess, getRandomWord, LetterState } from "../wordUtils";

interface GuessRow {
  guess: string;
  result?: LetterState[];
}

export enum gameStateEnum {
  "playing",
  "won",
  "lost",
}

interface ContextResult {
  answer: string;
  guesses: GuessRow[];
  addGuess: (guess: string) => void;
  newGame: () => void;
  gameState: gameStateEnum;
  keyboardLetterState: { [letter: string]: LetterState };
}

const WordContext = createContext<ContextResult>({
  answer: "",
  guesses: [],
  addGuess: (guess: string) => console.log("lol"),
  newGame: () => console.log("new game lol"),
  gameState: gameStateEnum.playing,
  keyboardLetterState: {},
});

interface WordContextProviderProps {
  children: ReactNode;
}
export function WordContextProvider({ children }: WordContextProviderProps) {
  const word = getRandomWord();
  const [answer, setAnswer] = useLocalStorage("answer", word);
  const [guesses, setGuesses] = useState<GuessRow[]>([]);
  const [gameState, setGameState] = useState<gameStateEnum>(
    gameStateEnum.playing
  );
  const [keyboardLetterState, setKeyboardLetterState] = useState<{
    [letter: string]: LetterState;
  }>({});

  const addGuess = (guess: string) => {
    const result = computeGuess(guess, answer);

    const didWin = result.every((i) => i === LetterState.Match);

    setGuesses([...guesses, { guess, result }]);
    // setGuesses(guesses.concat({ guess, result }));

    console.log("gs", guesses);

    if (didWin === true) {
      setGameState(gameStateEnum.won);
    } else if (guesses.length === 5) {
      setGameState(gameStateEnum.lost);
    } else {
      setGameState(gameStateEnum.playing);
    }

    result.forEach((r, i) => {
      const resultGuessLetter = guess[i];

      const currentLetterState = keyboardLetterState[resultGuessLetter];

      switch (currentLetterState) {
        case LetterState.Match:
          break;
        case LetterState.Present:
          if (r === LetterState.Miss) {
            break;
          }
        default:
          keyboardLetterState[resultGuessLetter] = r;
          break;
      }
    });
  };

  const newGame = () => {
    setAnswer(getRandomWord);
    setGuesses([]);
    setGameState(gameStateEnum.playing);
    setKeyboardLetterState({});
  };

  return (
    <WordContext.Provider
      value={{
        answer,
        guesses,
        addGuess,
        newGame,
        gameState,
        keyboardLetterState,
      }}
    >
      {children}
    </WordContext.Provider>
  );
}

export function useWordContext() {
  return useContext(WordContext);
}
