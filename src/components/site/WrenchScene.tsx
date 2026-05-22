import { useRef, useState } from "react";

export function WrenchScene() {
  const [rotation, setRotation] = useState({ x: 16, y: -18 });
  const dragRef = useRef({ active: false, x: 0, y: 0, rx: 16, ry: -18 });

  const stopDrag = () => {
    dragRef.current.active = false;
  };

  return (
    <section className="relative pt-28 pb-12 gradient-water overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
          Drag to rotate
        </span>
        <h2 className="mt-4 text-3xl md:text-5xl font-bold">
          Tools of the <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">trade</span>
        </h2>
      </div>

      <div
        className="relative mx-auto mt-8 flex h-[320px] w-full max-w-6xl items-center justify-center overflow-hidden select-none touch-none md:h-[420px]"
        onPointerDown={(event) => {
          dragRef.current = {
            active: true,
            x: event.clientX,
            y: event.clientY,
            rx: rotation.x,
            ry: rotation.y,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const drag = dragRef.current;
          if (!drag.active) return;
          setRotation({
            x: Math.max(-55, Math.min(55, drag.rx - (event.clientY - drag.y) * 0.35)),
            y: drag.ry + (event.clientX - drag.x) * 0.35,
          });
        }}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
      >
        <div className="absolute bottom-12 h-10 w-[560px] max-w-[70vw] rounded-full bg-foreground/10 blur-xl" />

        <div
          className="relative h-[170px] w-[min(780px,88vw)] cursor-grab active:cursor-grabbing transition-transform duration-75 [perspective:1000px]"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(-8deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute left-[16%] top-1/2 h-14 w-[68%] -translate-y-1/2 rounded-full bg-primary shadow-lift [transform:translateZ(18px)]" />
          <div className="absolute left-[18%] top-[calc(50%-39px)] h-4 w-[64%] rounded-full bg-card/80 [transform:translateZ(32px)]" />
          <div className="absolute left-[18%] top-[calc(50%+23px)] h-4 w-[64%] rounded-full bg-foreground/15 [transform:translateZ(32px)]" />

          <div className="absolute left-[8%] top-1/2 h-24 w-28 -translate-y-1/2 rounded-full bg-card shadow-lift [transform:translateZ(24px)]" />
          <div className="absolute right-[8%] top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-card shadow-lift [transform:translateZ(24px)]" />
          <div className="absolute right-[calc(8%+22px)] top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-primary/30 shadow-inner [transform:translateZ(36px)]" />

          <div className="absolute left-[2%] top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-card shadow-lift [transform:translateZ(30px)]" />
          <div className="absolute left-[calc(2%+34px)] top-1/2 h-[72px] w-[72px] -translate-y-1/2 rounded-full bg-primary/20 [transform:translateZ(42px)]" />
          <div className="absolute left-[-1%] top-[18px] h-20 w-28 rotate-[30deg] rounded-full bg-[var(--gradient-water)] [transform:translateZ(52px)]" />
          <div className="absolute left-[-1%] bottom-[18px] h-20 w-28 -rotate-[30deg] rounded-full bg-[var(--gradient-water)] [transform:translateZ(52px)]" />
          <div className="absolute left-[6%] top-[20px] h-11 w-20 rotate-[30deg] rounded-full bg-card [transform:translateZ(58px)]" />
          <div className="absolute left-[6%] bottom-[20px] h-11 w-20 -rotate-[30deg] rounded-full bg-card [transform:translateZ(58px)]" />
        </div>
      </div>
    </section>
  );
}