import { useRef, useState } from "react";
import { SplashIntro } from "./components/SplashIntro";
import { StartScreen } from "./components/StartScreen";
import { LevelSelect } from "./components/LevelSelect";
import { LevelPreview } from "./components/LevelPreview";
import { CharacterSelect } from "./components/CharacterSelect";
import { CinematicRobo } from "./components/CinematicRobo";

type Screen = "splash" | "start" | "select" | "cinematic" | "levelSelect" | "level";

function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio || muted) return;
    audio.volume = 0.6;
    audio.play().catch(() => {});
  };

  const goTo = (next: Screen) => {
    startMusic();
    setScreen(next);
  };

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
      <div
        className={`crt-screen w-full max-w-5xl h-[92vh] sm:h-auto sm:aspect-video rounded-md overflow-hidden ${screen === "splash" ? "crt-splash" : "border-4 sm:border-8 border-[var(--pi-brown-dark)]"}`}
      >

        {screen === "splash" && (
          <SplashIntro onFinished={() => { startMusic(); goTo("start"); }} />
        )}

        {screen === "start" && (
          <StartScreen
            onPlay={() => goTo("levelSelect")}
            onViewIntro={() => goTo("cinematic")}
            onSelectCharacter={() => goTo("select")}
            onToggleMute={toggleMute}
            muted={muted}
          />
        )}

        {screen === "cinematic" && (
          <CinematicRobo onFinished={() => goTo("levelSelect")} />
        )}

        {screen === "select" && (
          <CharacterSelect
            onConfirm={() => goTo("levelSelect")}
            onBack={() => goTo("start")}
          />
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
