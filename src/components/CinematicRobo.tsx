import { useEffect, useRef, useState } from "react";
import navataBg from "../assets/backgrounds/navata_bg_3.jpg";

const lines = [
  "Viernes noche. Local de ensayo. Alt Empordà.",
  "La banda acaba de terminar el mejor ensayo de los últimos meses.",
  "Mañana tocan en la Fiesta de la Cerveza de Figueres.",
  "De repente… luces de una furgoneta negra.",
  "Cuatro hombres de traje. Sin decir una palabra.",
  "Se llevan todos los instrumentos.",
  "En 2 minutos han desaparecido.",
];

const grafiti = '"El ruido ha terminado. — Los Correctos Supremos"';

type Stage = "text" | "scene" | "grafiti" | "response";

interface Props {
  onFinished: () => void;
}

export function CinematicRobo({ onFinished }: Props) {
  const [stage, setStage] = useState<Stage>("text");
  const [lineIndex, setLineIndex] = useState(0);
  const [showVan, setShowVan] = useState(false);
  const [vanLeaving, setVanLeaving] = useState(false);
  const [showGrafiti, setShowGrafiti] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const onFinishedRef = useRef(onFinished);
  onFinishedRef.current = onFinished;

  // Líneas de texto
  useEffect(() => {
    if (stage !== "text") return;
    if (lineIndex < lines.length) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 1900);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setStage("scene"), 600);
      return () => clearTimeout(t);
    }
  }, [stage, lineIndex]);

  // Escena de la furgoneta
  useEffect(() => {
    if (stage !== "scene") return;
    const t1 = setTimeout(() => setShowVan(true), 400);
    const t2 = setTimeout(() => setVanLeaving(true), 3000);
    const t3 = setTimeout(() => setStage("grafiti"), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [stage]);

  // Grafiti en la pared
  useEffect(() => {
    if (stage !== "grafiti") return;
    const t1 = setTimeout(() => setShowGrafiti(true), 500);
    const t2 = setTimeout(() => setStage("response"), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [stage]);

  // Respuesta de Adri
  useEffect(() => {
    if (stage !== "response") return;
    const t1 = setTimeout(() => setShowResponse(true), 600);
    const t2 = setTimeout(() => onFinishedRef.current(), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [stage]);

  const skip = () => onFinishedRef.current();

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden cursor-pointer"
      style={{ background: "#000" }}
      onClick={skip}
    >
      <style>{`
        @keyframes van-enter {
          0%   { transform: translateX(60vw); }
          100% { transform: translateX(0); }
        }
        @keyframes van-leave {
          0%   { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-80vw); opacity: 0; }
        }
        @keyframes grafiti-appear {
          0%   { opacity: 0; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in-up {
          0%   { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes lights-flash {
          0%, 100% { opacity: 0; }
          10%, 30%, 50% { opacity: 1; }
          20%, 40% { opacity: 0.3; }
        }
        .van-entering { animation: van-enter 1.2s cubic-bezier(0.22,1,0.36,1) forwards; }
        .van-leaving  { animation: van-leave 1.5s ease-in forwards; }
        .grafiti-anim { animation: grafiti-appear 0.8s ease-out forwards; }
        .fade-up      { animation: fade-in-up 0.6s ease-out forwards; }
        .lights-anim  { animation: lights-flash 1.5s ease-in-out; }
      `}</style>

      {/* FASE TEXTO */}
      {stage === "text" && (
        <div className="flex flex-col items-center gap-3 text-center max-w-2xl px-6">
          {lines.slice(0, lineIndex).map((line, i) => (
            <p
              key={i}
              className="font-pixel text-[var(--pi-cream)] text-xs sm:text-sm leading-relaxed"
              style={{ opacity: i === lineIndex - 1 ? 1 : 0.5 }}
            >
              {line}
            </p>
          ))}
          <span className="font-pixel text-[var(--pi-orange)] text-xs pi-blink mt-2">
            {lineIndex < lines.length ? "▌" : ""}
          </span>
        </div>
      )}

      {/* FASE ESCENA — furgoneta */}
      {stage === "scene" && (
        <div
          className="relative w-full h-full flex items-end justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${navataBg})` }}
        >
          <div className="absolute inset-0 bg-black/60" />

          {/* Luces de la furgoneta */}
          {showVan && !vanLeaving && (
            <div
              className="absolute inset-0 lights-anim"
              style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(255,200,100,0.15) 0%, transparent 60%)" }}
            />
          )}

          {/* La furgoneta */}
          {showVan && (
            <div
              className={`absolute bottom-[15%] right-[5%] text-6xl sm:text-8xl z-10 ${vanLeaving ? "van-leaving" : "van-entering"}`}
            >
              🚐
            </div>
          )}

          {/* Texto escena */}
          <div className="relative z-20 mb-8 text-center px-4">
            <p className="font-pixel text-[var(--pi-cream)] text-xs sm:text-sm opacity-80">
              {vanLeaving ? "La furgoneta desaparece en la noche…" : "Cuatro hombres de traje bajan de la furgoneta."}
            </p>
          </div>
        </div>
      )}

      {/* FASE GRAFITI */}
      {stage === "grafiti" && (
        <div
          className="relative w-full h-full flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${navataBg})` }}
        >
          <div className="absolute inset-0 bg-black/75" />
          <div className="relative z-10 text-center px-8 max-w-2xl">
            {showGrafiti && (
              <p
                className="font-pixel text-[var(--pi-orange)] text-sm sm:text-xl leading-relaxed grafiti-anim"
                style={{ textShadow: "0 0 20px rgba(255,100,0,0.6)" }}
              >
                {grafiti}
              </p>
            )}
          </div>
        </div>
      )}

      {/* FASE RESPUESTA DE ADRI */}
      {stage === "response" && (
        <div
          className="relative w-full h-full flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${navataBg})` }}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 text-center px-8 max-w-2xl flex flex-col items-center gap-6">
            <p className="font-pixel text-[var(--pi-cream)] text-xs sm:text-sm opacity-60">
              Adri mira a los otros tres.
            </p>
            {showResponse && (
              <p
                className="font-pixel text-[var(--pi-teal)] text-base sm:text-2xl fade-up"
                style={{ textShadow: "0 0 16px rgba(0,200,180,0.5)" }}
              >
                "Pues vamos a buscarlos."
              </p>
            )}
          </div>
        </div>
      )}

      {/* Skip */}
      <p className="absolute bottom-3 right-4 font-pixel text-[9px] sm:text-[11px] text-[var(--pi-cream)] opacity-40 z-30">
        clic para saltar
      </p>
    </div>
  );
}
