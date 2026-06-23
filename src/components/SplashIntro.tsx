import { useEffect, useRef, useState } from "react";
import logoFull from "../assets/logo_full.png";

const splashLines = [
  "Los Correctos Supremos han robado los instrumentos.",
  "Quieren prohibir la música, la cerveza y la diversión.",
  "Pero la banda no piensa quedarse callada.",
  "Solo hay una forma de recuperarlos…",
  "Hacer más ruido.",
];

type Stage = "logo" | "text";

interface SplashIntroProps {
  onFinished: () => void;
}

export function SplashIntro({ onFinished }: SplashIntroProps) {
  const [stage, setStage] = useState<Stage>("logo");
  const [lineIndex, setLineIndex] = useState(0);
  const onFinishedRef = useRef(onFinished);
  onFinishedRef.current = onFinished;

  // Logo aparece y pasa a texto
  useEffect(() => {
    const t = setTimeout(() => setStage("text"), 3000);
    return () => clearTimeout(t);
  }, []);

  // Texto línea a línea
  useEffect(() => {
    if (stage !== "text") return;
    if (lineIndex < splashLines.length) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 1800);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => onFinishedRef.current(), 800);
      return () => clearTimeout(t);
    }
  }, [stage, lineIndex]);

  const skip = () => onFinishedRef.current();

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden cursor-pointer"
      style={{ background: "#000000" }}
      onClick={skip}
    >
      {/* LOGO */}
      {stage === "logo" && (
        <>
          <style>{`
            @keyframes logo-grow {
              0%   { transform: scale(0.15); opacity: 0; }
              30%  { opacity: 1; }
              100% { transform: scale(1); opacity: 1; }
            }
            .logo-grow { animation: logo-grow 2.2s cubic-bezier(0.22,1,0.36,1) forwards; }
          `}</style>
          <div className="flex flex-col items-center gap-2 logo-grow" >
            <img
              src={logoFull}
              alt="Poéticamente Incorrectos"
              className="w-48 sm:w-72 drop-shadow-[0_0_40px_rgba(255,120,0,0.6)]"
              style={{ mixBlendMode: "multiply" }}
            />
            <p className="font-pixel text-[var(--pi-teal)] text-xs sm:text-sm tracking-widest uppercase mt-2">
              — The Video Game —
            </p>
          </div>
        </>
      )}

      {/* TEXTO */}
      {stage === "text" && (
        <div className="flex flex-col items-center gap-3 text-center max-w-xl px-4">
          {splashLines.slice(0, lineIndex).map((line, i) => (
            <p key={i} className="font-pixel text-[var(--pi-cream)] text-xs sm:text-base leading-relaxed opacity-90">
              {line}
            </p>
          ))}
          <span className="font-pixel text-[var(--pi-orange)] text-xs sm:text-base pi-blink">
            {lineIndex < splashLines.length ? "▌" : ""}
          </span>
        </div>
      )}


      {/* Skip */}
      <p className="absolute bottom-3 right-4 font-pixel text-[9px] sm:text-[11px] text-[var(--pi-cream)] opacity-40">
        clic para saltar
      </p>
    </div>
  );
}
