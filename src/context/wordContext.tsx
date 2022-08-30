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

interface ContextResult {
  answer: string;
  guesses: GuessRow[];
  addGuess: (guess: string) => void;
  newGame: () => void;
}

const WordContext = createContext<ContextResult>({
  answer: "",
  guesses: [],
  addGuess: (guess: string) => console.log("lol"),
  newGame: () => console.log("new game lol"),
});

interface WordContextProviderProps {
  children: ReactNode;
}
export function WordContextProvider({ children }: WordContextProviderProps) {
  const word = getRandomWord();
  const [answer, setAnswer] = useLocalStorage("answer", word);
  const [guesses, setGuesses] = useState<GuessRow[]>([]);
  const addGuess = (guess: string) =>
    setGuesses([...guesses, { guess, result: computeGuess(guess, answer) }]);

  const newGame = () => {
    setAnswer(getRandomWord);
    setGuesses([]);
  };

  return (
    <WordContext.Provider value={{ answer, guesses, addGuess, newGame }}>
      {children}
    </WordContext.Provider>
  );
}

export function useWordContext() {
  return useContext(WordContext);
}
