import { useWordContext } from "../context/wordContext";
import { computeGuess, LetterState } from "../wordUtils";

interface WordRowProps {
  letters: string;
  result?: LetterState[];
  className?: string;
}

interface CharacterBoxProps {
  value: string;
  state?: LetterState;
}

export const LETTER_LENGTH = 5;

export default function WordRow({
  letters: lettersProp = "",
  result = [],
  className = "",
}: WordRowProps) {
  const lettersRemaining = LETTER_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split("")
    .concat(Array(lettersRemaining).fill(""));

  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {letters.map((char, i) => (
        <CharacterBox key={i} value={char} state={result[i]} />
      ))}
    </div>
  );
}

function CharacterBox({ value, state }: CharacterBoxProps) {
  const stateStyles =
    state == null ? "border-gray-500 text-black" : characterStateStyles[state];

  return (
    <div
      className={`inline-block border-2 border-black p-4 before:inline-block before:content-['_'] uppercase font-bold text-2xl text-center ${stateStyles}`}
    >
      {value}
    </div>
  );
}

const characterStateStyles = {
  [LetterState.Miss]: "bg-gray-500",
  [LetterState.Present]: "bg-yellow-500",
  [LetterState.Match]: "bg-green-500",
};
