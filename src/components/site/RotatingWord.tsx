import { useEffect, useState } from "react";

const words = ["DESIGN", "EDIT", "BRAND", "ANIMATE", "ADVERTISE"];

export function RotatingWord({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % words.length), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      key={i}
      className={`inline-block text-primary text-glow ${className}`}
      style={{ animation: "fade-in 0.5s ease-out" }}
    >
      {words[i]}
    </span>
  );
}
