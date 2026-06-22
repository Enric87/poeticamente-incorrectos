import { useEffect, useRef, useState } from "react";
import { StartScreen } from "./components/StartScreen";
import { IntroSequence } from "./components/IntroSequence";
import { LevelSelect } from "./components/LevelSelect";
import { LevelPreview } from "./components/LevelPreview";
import { CharacterSelect } from "./components/CharacterSelect";

type Screen = "start" | "select" | "intro" | "levelSelect" | "level";

function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const musicStarted = useRef(false);

  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio || musicStarted.current || muted) return;
    audio.volume = 0.6;
    audio.play().then(() => {
      musicStarted.current = true;
    }).catch(() => {});
  };

  // Arranca la música en el primer clic en cualquier parte de la pantalla
  useEffect(() => {
    const handler = () => startMusic();
    window.addEventListener("click", handler, { once: true });
    return () => window.removeEventListener("click", handler);
  }, []);

  const goTo = (next: Screen) => {
    setScreen(next);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      audio.play().catch(() => {});
      musicStarted.current = true;
    } else {
      audio.pause();
    }
    setMuted(!muted);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black p-2 sm:p-6">
      <audio ref={audioRef} src="/music-start.mp3" loop />
      <div className="crt-screen w-full max-w-5xl h-[92vh] sm:h-auto sm:aspect-video border-4 sm:border-8 border-[var(--pi-brown-dark)] rounded-md">
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
