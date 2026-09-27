"use client";

import { useEffect, useState } from "react";

interface TypingEffectProps {
  words: string[];
  className?: string;
}

export function TypingEffect({ words, className = "" }: TypingEffectProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const current = words[index % words.length];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) {
            setTimeout(() => setDeleting(true), 1800);
          }
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setIndex((i) => i + 1);
          }
        }
      },
      deleting ? 40 : 100
    );

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return (
    <span className={className}>
      {text}
      <span className="inline-block w-[3px] h-[1em] bg-gold-500 ms-1 animate-pulse align-middle" />
    </span>
  );
}