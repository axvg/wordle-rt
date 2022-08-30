import { useWordContext } from "../context/wordContext";
import { LetterState } from "../wordUtils";

interface KeyboardProps {
  onClick: (letter: string) => void;
}

export default function Keyboard({ onClick: onClickProp }: KeyboardProps) {
  const { keyboardLetterState } = useWordContext();

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const letter = e.currentTarget.textContent!;
    onClickProp(letter);
  };

  return (
    <div className="flex flex-col">
      {keyboardKeys.map((kRow, rowI) => {
        return (
          <div className="flex my-2 justify-center space-x-1" key={rowI}>
            {kRow.map((key, i) => {
              let styles = "rounded font-bold uppercase flex-1 py-2";
              const letterState = keyStateStyles[keyboardLetterState[key]];

              if (letterState) {
                styles += ` text-white px-1 ${letterState}`;
              } else if (key !== "") {
                styles += " bg-gray-400 px-1";
              }

              if (key === "") {
                styles += " pointer-events-none";
              } else {
                styles += " px-1";
              }

              return (
                <button className={styles} key={i} onClick={onClick}>
                  {key}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

const keyboardKeys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["", "a", "s", "d", "f", "g", "h", "j", "k", "l", ""],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

const keyStateStyles = {
  [LetterState.Miss]: "border-gray-500 bg-gray-500",
  [LetterState.Present]: "border-yellow-500 bg-yellow-500",
  [LetterState.Match]: "border-green-500 bg-green-500",
};
