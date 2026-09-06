"use client";

import { ReactNode, useRef, useState } from "react";

// Mouse position relative to card center drives a tilt (--rx/--ry) plus an
// opposite-direction background parallax (--tx/--ty) — see .tilt-card* in
// globals.css for the actual transform/transition rules this feeds.
export default function TiltCard({
  image,
  className,
  children,
}: {
  image: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) / rect.width,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height,
    });
  };

  const handleMouseEnter = () => clearTimeout(leaveTimer.current);
  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => setPos({ x: 0, y: 0 }), 500);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="tilt-card-wrap"
      style={
        {
          "--rx": `${pos.y * -30}deg`,
          "--ry": `${pos.x * 30}deg`,
          "--tx": `${pos.x * -40}px`,
          "--ty": `${pos.y * -40}px`,
        } as React.CSSProperties
      }
    >
      <div className={`tilt-card ${className ?? ""}`}>
        <div
          className="tilt-card-bg"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="tilt-card-info">{children}</div>
      </div>
    </div>
  );
}
