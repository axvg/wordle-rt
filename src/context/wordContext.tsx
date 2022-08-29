import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getRandomWord } from "../wordUtils";

interface ContextResult {
  answer: string;
  guesses: string[];
  addGuess: (guess: string) => void;
}

const WordContext = createContext<ContextResult>({
  answer: "",
  guesses: [],
  addGuess: (guess: string) => console.log("lol"),
});

interface WordContextProviderProps {
  children: ReactNode;
}
export function WordContextProvider({ children }: WordContextProviderProps) {
  const word = getRandomWord();
  const [answer, setAnswer] = useLocalStorage("answer", word);
  const [guesses, setGuesses] = useState<string[]>([
    "hello",
    "solar",
    "snack",
    "blood",
  ]);
  const addGuess = (guess: string) => setGuesses([...guesses, guess]);

  return (
    <WordContext.Provider value={{ answer, guesses, addGuess }}>
      {children}
    </WordContext.Provider>
  );
}

export function useWordContext() {
  return useContext(WordContext);
}
