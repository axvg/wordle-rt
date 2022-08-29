import "./App.css";
import WordRow from "./WordRow";

function App() {
  return (
    <div className="mx-auto w-96">
      <header className="border-b border-white pb-2 my-2">
        <h1 className="text-4xl text-center">Reacdle</h1>
      </header>
      <main>
        <WordRow letters="heo" />
        <WordRow letters="hel" />
        <WordRow letters="hello" />
      </main>
    </div>
  );
}

export default App;
