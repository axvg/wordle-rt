export default function Keyboard() {
  return (
    <div className="flex flex-col">
      {keyboardKeys.map((kRow, i) => {
        return (
          <div className="flex my-2 justify-center space-x-1" key={i}>
            {kRow.map((key, i) => {
              let styles = "rounded font-bold uppercase flex-1 py-2";

              if (key === "") {
                styles += " pointer-events-none";
              } else {
                styles += " bg-gray-400 px-1";
              }
              return (
                <button className={styles} key={i}>
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
