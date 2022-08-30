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
}

const WordContext = createContext<ContextResult>({
  answer: "",
  guesses: [],
  addGuess: (guess: string) => console.log("lol"),
  newGame: () => console.log("new game lol"),
  gameState: gameStateEnum.playing,
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

  const addGuess = (guess: string) => {
    const result = computeGuess(guess, answer);

    const didWin = result.every((i) => i === LetterState.Match);

    setGuesses([...guesses, { guess, result }]);

    if (didWin === true) {
      setGameState(gameStateEnum.won);
    } else if (guesses.length === 5) {
      setGameState(gameStateEnum.lost);
    } else {
      setGameState(gameStateEnum.playing);
    }
  };

  const newGame = () => {
    setAnswer(getRandomWord);
    setGuesses([]);
    setGameState(gameStateEnum.playing);
  };

  return (
    <WordContext.Provider
      value={{ answer, guesses, addGuess, newGame, gameState }}
    >
      {children}
    </WordContext.Provider>
  );
}

export function useWordContext() {
  return useContext(WordContext);
}
