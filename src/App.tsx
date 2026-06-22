import { useRef, useState } from "react";
import { StartScreen } from "./components/StartScreen";
import { IntroSequence } from "./components/IntroSequence";
import { LevelSelect } from "./components/LevelSelect";
import { LevelPreview } from "./components/LevelPreview";
import { CharacterSelect } from "./components/CharacterSelect";

type Screen = "pressStart" | "start" | "select" | "intro" | "levelSelect" | "level";

function App() {
  const [screen, setScreen] = useState<Screen>("pressStart");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  const handlePressStart = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.6;
      audio.play().catch(() => {});
    }
    setScreen("start");
  };

  const goTo = (next: Screen) => setScreen(next);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
    setMuted(!muted);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black p-2 sm:p-6">
      <audio ref={audioRef} src="/music-start.mp3" loop />
      <div className="crt-screen w-full max-w-5xl h-[92vh] sm:h-auto sm:aspect-video border-4 sm:border-8 border-[var(--pi-brown-dark)] rounded-md overflow-hidden">

        {screen === "pressStart" && (
          <div
            className="w-full h-full flex flex-col items-center justify-center bg-black cursor-pointer select-none"
            onClick={handlePressStart}
          >
            <p className="font-pixel text-[var(--pi-orange)] text-xl sm:text-3xl pi-blink tracking-widest uppercase">
              — Press Start —
            </p>
            <p className="font-pixel text-[var(--pi-cream)] text-[10px] sm:text-xs mt-4 opacity-50">
              Haz clic para empezar
            </p>
          </div>
        )}

        {screen === "start" && (
          <StartScreen
            onPlay={() => goTo("intro")}
            onSelectCharacter={() => goTo("select")}
            onToggleMute={toggleMute}
            muted={muted}
          />
        )}

        {screen === "select" && (
          <CharacterSelect
            onConfirm={() => goTo("intro")}
            onBack={() => goTo("start")}
          />
        )}

        {screen === "intro" && (
          <IntroSequence onFinished={() => goTo("levelSelect")} />
        )}

        {screen === "levelSelect" && (
          <LevelSelect
            onSelectLevel={() => goTo("level")}
            onBack={() => goTo("start")}
          />
        )}

        {screen === "level" && (
          <LevelPreview onBackToStart={() => goTo("start")} />
        )}
      </div>
    </div>
  );
}

export default App;
