import { useEffect, useRef, useState } from "react";
import navataBg from "../assets/backgrounds/navata_bg_3.jpg";

const lines = [
  "Viernes noche. Local de ensayo. Alt Empordà.",
  "La banda acaba de terminar el mejor ensayo de los últimos meses.",
  "Mañana tocan en la Fiesta de la Cerveza de Figueres.",
  "De repente… luces de una furgoneta negra.",
];

const grafiti = '"El ruido ha terminado. — Los Correctos Supremos"';

// Sub-fases de la escena del robo
type ScenePhase = "van-arrives" | "men-out" | "stealing" | "loading" | "van-leaves";
type Stage = "text" | "scene" | "grafiti" | "response";

const instruments = ["🎸", "🎸", "🎷", "🥁"];
const men = ["🕴️", "🕴️", "🕴️", "🕴️"];

interface Props {
  onFinished: () => void;
}

export function CinematicRobo({ onFinished }: Props) {
  const [stage, setStage] = useState<Stage>("text");
  const [lineIndex, setLineIndex] = useState(0);
  const [scenePhase, setScenePhase] = useState<ScenePhase>("van-arrives");
  const [caption, setCaption] = useState("");
  const [showGrafiti, setShowGrafiti] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const onFinishedRef = useRef(onFinished);
  onFinishedRef.current = onFinished;

  // Líneas de texto intro
  useEffect(() => {
    if (stage !== "text") return;
    if (lineIndex < lines.length) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 1900);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setStage("scene"); setScenePhase("van-arrives"); }, 600);
      return () => clearTimeout(t);
    }
  }, [stage, lineIndex]);

  // Secuencia de la escena del robo
  useEffect(() => {
    if (stage !== "scene") return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => { setScenePhase("van-arrives"); setCaption("Una furgoneta negra para delante del local."); }, 200));
    timers.push(setTimeout(() => { setScenePhase("men-out");    setCaption("Cuatro hombres de traje bajan en silencio."); }, 2200));
    timers.push(setTimeout(() => { setScenePhase("stealing");   setCaption("Entran. Cogen todos los instrumentos."); }, 4500));
    timers.push(setTimeout(() => { setScenePhase("loading");    setCaption("Los cargan en la furgoneta."); }, 7000));
    timers.push(setTimeout(() => { setScenePhase("van-leaves"); setCaption("En 2 minutos… han desaparecido."); }, 9000));
    timers.push(setTimeout(() => setStage("grafiti"), 11500));

    return () => timers.forEach(clearTimeout);
  }, [stage]);

  // Grafiti
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
          0%   { transform: translateX(120%); }
          100% { transform: translateX(0); }
        }
        @keyframes van-leave {
          0%   { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-120%); opacity: 0; }
        }
        @keyframes man-enter {
          0%   { transform: translateX(80px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes man-steal {
          0%   { transform: translateY(0); }
          30%  { transform: translateY(-8px); }
          60%  { transform: translateY(4px); }
          100% { transform: translateY(0); }
        }
        @keyframes man-load {
          0%   { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(60px); opacity: 0; }
        }
        @keyframes instrument-stolen {
          0%   { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-30px) scale(0.5); opacity: 0; }
        }
        @keyframes instrument-appear {
          0%   { opacity: 0; transform: scale(0.5); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes grafiti-appear {
          0%   { opacity: 0; transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in-up {
          0%   { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes lights-flash {
          0%, 100% { opacity: 0; }
          15%, 45% { opacity: 1; }
          30% { opacity: 0.2; }
        }
        .van-entering   { animation: van-enter 1.2s cubic-bezier(0.22,1,0.36,1) forwards; }
        .van-leaving    { animation: van-leave 2s ease-in forwards; }
        .man-entering   { animation: man-enter 0.5s ease-out forwards; }
        .man-stealing   { animation: man-steal 0.6s ease-in-out infinite; }
        .man-loading    { animation: man-load 0.8s ease-in forwards; }
        .instrument-stolen { animation: instrument-stolen 0.5s ease-in forwards; }
        .instrument-appear { animation: instrument-appear 0.4s ease-out forwards; }
        .grafiti-anim   { animation: grafiti-appear 0.8s ease-out forwards; }
        .fade-up        { animation: fade-in-up 0.6s ease-out forwards; }
        .lights-anim    { animation: lights-flash 2s ease-in-out; }
        .caption-box {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 30;
        }
      `}</style>

      {/* FASE TEXTO */}
      {stage === "text" && (
        <div className="flex flex-col items-center gap-3 text-center max-w-2xl px-6">
          {lines.slice(0, lineIndex).map((line, i) => (
            <p
              key={i}
              className="font-pixel text-[var(--pi-cream)] text-xs sm:text-sm leading-relaxed"
              style={{ opacity: i === lineIndex - 1 ? 1 : 0.45 }}
            >
              {line}
            </p>
          ))}
          <span className="font-pixel text-[var(--pi-orange)] text-xs pi-blink mt-2">
            {lineIndex < lines.length ? "▌" : ""}
          </span>
        </div>
      )}

      {/* FASE ESCENA — el robo */}
      {stage === "scene" && (
        <div
          className="relative w-full h-full flex items-end justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${navataBg})` }}
        >
          <div className="absolute inset-0 bg-black/65" />

          {/* Luces de la furgoneta al llegar */}
          {scenePhase === "van-arrives" && (
            <div
              className="absolute inset-0 lights-anim"
              style={{ background: "radial-gradient(ellipse at 75% 50%, rgba(255,220,120,0.2) 0%, transparent 55%)" }}
            />
          )}

          {/* FURGONETA */}
          <div
            className={`absolute bottom-[18%] right-[6%] z-20 select-none
              ${scenePhase === "van-arrives" ? "van-entering" : ""}
              ${scenePhase === "van-leaves" ? "van-leaving" : ""}
            `}
            style={{ fontSize: "clamp(48px, 8vw, 80px)", lineHeight: 1 }}
          >
            🚐
          </div>

          {/* INSTRUMENTOS en el suelo (antes del robo) */}
          {(scenePhase === "men-out") && (
            <div className="absolute bottom-[28%] left-[20%] flex gap-4 z-10">
              {instruments.map((inst, i) => (
                <span
                  key={i}
                  className="instrument-appear select-none"
                  style={{ fontSize: "clamp(20px, 3vw, 32px)", animationDelay: `${i * 0.1}s`, opacity: 0 }}
                >
                  {inst}
                </span>
              ))}
            </div>
          )}

          {/* HOMBRES DE TRAJE */}
          {(scenePhase === "men-out" || scenePhase === "stealing" || scenePhase === "loading") && (
            <div className="absolute bottom-[22%] left-[15%] flex gap-2 sm:gap-4 z-20">
              {men.map((man, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span
                    className={`select-none
                      ${scenePhase === "men-out" ? "man-entering" : ""}
                      ${scenePhase === "stealing" ? "man-stealing" : ""}
                      ${scenePhase === "loading" ? "man-loading" : ""}
                    `}
                    style={{
                      fontSize: "clamp(22px, 3.5vw, 40px)",
                      animationDelay: scenePhase === "men-out" ? `${i * 0.15}s` : `${i * 0.1}s`,
                      display: "inline-block",
                    }}
                  >
                    {man}
                  </span>
                  {/* Instrumento robado encima del hombre */}
                  {scenePhase === "loading" && (
                    <span
                      className="instrument-stolen select-none"
                      style={{
                        fontSize: "clamp(14px, 2vw, 22px)",
                        position: "absolute",
                        top: "-20px",
                        animationDelay: `${i * 0.1}s`,
                      }}
                    >
                      {instruments[i]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Caption */}
          <div className="caption-box w-full px-4">
            <p
              key={caption}
              className="font-pixel text-[var(--pi-cream)] text-xs sm:text-sm opacity-90 fade-up"
            >
              {caption}
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
          <div className="absolute inset-0 bg-black/78" />
          <div className="relative z-10 text-center px-8 max-w-2xl">
            {showGrafiti && (
              <p
                className="font-pixel text-[var(--pi-orange)] text-sm sm:text-xl leading-relaxed grafiti-anim"
                style={{ textShadow: "0 0 24px rgba(255,100,0,0.7)" }}
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
