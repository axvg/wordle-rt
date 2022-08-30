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
  const [guesses, setGuesses] = useState<string[]>([
    "hello",
    "solar",
    "snack",
    "blood",
  ]);
  const addGuess = (guess: string) => setGuesses([...guesses, guess]);

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
