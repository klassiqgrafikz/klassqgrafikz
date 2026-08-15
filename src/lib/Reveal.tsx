import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

const TAGS = ["div", "li", "span", "section"] as const;
type Tag = (typeof TAGS)[number];

type Direction = "up" | "left" | "right" | "zoom" | "fade";

const hiddenClass: Record<Direction, string> = {
  up: "reveal-up",
  left: "reveal-left",
  right: "reveal-right",
  zoom: "reveal-zoom",
  fade: "",
};

type RevealProps = {
  children: ReactNode;
  as?: Tag;
  direction?: Direction;
  delay?: number;
  className?: string;
};

export function Reveal({
  children,
  as = "div",
  direction = "up",
  delay = 0,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -48px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const style: CSSProperties | undefined =
    delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return createElement(
    as,
    {
      ref,
      className:
        `reveal ${hiddenClass[direction]} ${visible ? "reveal-visible" : ""} ${className}`.trim(),
      style,
    },
    children,
  );
}
