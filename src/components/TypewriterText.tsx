"use client";

import { useState, useEffect } from "react";

interface TypewriterTextProps {
  prefix: string;
  highlight: string;
  speed?: number;
  className?: string;
}

export function TypewriterText({
  prefix,
  highlight,
  speed = 100,
  className = "",
}: TypewriterTextProps) {
  const [prefixIndex, setPrefixIndex] = useState(0);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const isPrefixComplete = prefixIndex === prefix.length;
  const isHighlightComplete = highlightIndex === highlight.length;
  const isComplete = isPrefixComplete && isHighlightComplete;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isPrefixComplete) {
        setPrefixIndex(prev => prev + 1);
      } else if (!isHighlightComplete) {
        setHighlightIndex(prev => prev + 1);
      }
    }, speed);

    return () => clearTimeout(timeoutId);
  }, [prefixIndex, highlightIndex, isPrefixComplete, isHighlightComplete, speed]);

  return (
    <span className={className}>
      {prefix.slice(0, prefixIndex)}
      <span className="font-semibold text-white/95">
        {highlight.slice(0, highlightIndex)}
      </span>
      {!isComplete && (
        <span className="inline-block w-0.5 h-1em bg-white/70 ml-0.5 animate-pulse" />
      )}
    </span>
  );
}
