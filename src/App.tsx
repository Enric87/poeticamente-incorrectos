import { useState } from "react";
import { StartScreen } from "./components/StartScreen";
import { IntroSequence } from "./components/IntroSequence";
import { LevelPreview } from "./components/LevelPreview";
import { CharacterSelect } from "./components/CharacterSelect";

type Screen = "start" | "select" | "intro" | "level";

function App() {
  const [screen, setScreen] = useState<Screen>("start");

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black p-2 sm:p-6">
      {/* Marco "monitor arcade" — formato 16:9 en escritorio, fluido en móvil */}
      <div className="crt-screen w-full max-w-5xl h-[92vh] sm:h-auto sm:aspect-video border-4 sm:border-8 border-[var(--pi-brown-dark)] rounded-md">
        {screen === "start" && (
          <StartScreen
            onPlay={() => setScreen("intro")}
            onSelectCharacter={() => setScreen("select")}
          />
        )}

        {screen === "select" && (
          <CharacterSelect
            onConfirm={() => setScreen("intro")}
            onBack={() => setScreen("start")}
          />
        )}

        {screen === "intro" && (
          <IntroSequence onFinished={() => setScreen("level")} />
        )}

        {screen === "level" && (
          <LevelPreview onBackToStart={() => setScreen("start")} />
        )}
      </div>
    </div>
  );
}

export default App;
