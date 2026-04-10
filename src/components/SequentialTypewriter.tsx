"use client";

import { useState, useEffect } from "react";

interface Line {
  prefix?: string;
  highlight?: string;
  text?: string;
  className?: string;
  tag?: "h1" | "p";
  speed?: number;
}

interface SequentialTypewriterProps {
  lines: Line[];
  onComplete?: () => void;
  onLineComplete?: (lineIndex: number) => void;
}

export function SequentialTypewriter({ lines, onComplete, onLineComplete }: SequentialTypewriterProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [prefixLength, setPrefixLength] = useState(0);
  const [highlightLength, setHighlightLength] = useState(0);
  const [textLength, setTextLength] = useState(0);

  const currentLine = lines[currentLineIndex];
  const isCurrentLineComplete = currentLine
    ? currentLine.text
      ? textLength === currentLine.text.length
      : (currentLine.prefix ? prefixLength === currentLine.prefix.length : true) &&
        (currentLine.highlight ? highlightLength === currentLine.highlight.length : true)
    : false;

  useEffect(() => {
    if (!currentLine) {
      onComplete?.();
      return;
    }

    const speed = currentLine.speed || 100;
    const timeoutId = setTimeout(() => {
      if (currentLine.text) {
        // 简单文本模式
        if (textLength < currentLine.text!.length) {
          setTextLength(prev => prev + 1);
        } else if (isCurrentLineComplete && currentLineIndex < lines.length - 1) {
          // 当前行完成，移到下一行
          onLineComplete?.(currentLineIndex);
          setCurrentLineIndex(prev => prev + 1);
          setTextLength(0);
        } else if (isCurrentLineComplete) {
          // 最后一行完成
          onLineComplete?.(currentLineIndex);
          onComplete?.();
        }
      } else {
        // prefix + highlight 模式
        const prefixDone = !currentLine.prefix || prefixLength === currentLine.prefix.length;
        if (!prefixDone) {
          setPrefixLength(prev => prev + 1);
        } else if (currentLine.highlight && highlightLength < currentLine.highlight.length) {
          setHighlightLength(prev => prev + 1);
        } else if (isCurrentLineComplete && currentLineIndex < lines.length - 1) {
          onLineComplete?.(currentLineIndex);
          setCurrentLineIndex(prev => prev + 1);
          setPrefixLength(0);
          setHighlightLength(0);
        } else if (isCurrentLineComplete) {
          onLineComplete?.(currentLineIndex);
          onComplete?.();
        }
      }
    }, speed);

    return () => clearTimeout(timeoutId);
  }, [
    currentLine,
    currentLineIndex,
    prefixLength,
    highlightLength,
    textLength,
    isCurrentLineComplete,
    lines.length,
    onComplete
  ]);

  const renderLine = (line: Line, index: number) => {
    const isCurrent = index === currentLineIndex;
    const isPast = index < currentLineIndex;
    const showCursor = isCurrent && !isCurrentLineComplete;

    if (line.text) {
      // 简单文本模式
      const displayLength = isPast ? line.text!.length : textLength;
      return (
        <>
          {line.text!.slice(0, displayLength)}
          {showCursor && <span className="inline-block w-0.5 h-1em bg-white/70 ml-0.5 animate-pulse" />}
        </>
      );
    }

    // prefix + highlight 模式
    const displayPrefixLength = isPast ? line.prefix?.length || 0 : prefixLength;
    const displayHighlightLength = isPast ? line.highlight?.length || 0 : highlightLength;

    return (
      <>
        {line.prefix && line.prefix.slice(0, displayPrefixLength)}
        {line.highlight && (
          <span className="font-semibold text-white/95">
            {line.highlight.slice(0, displayHighlightLength)}
          </span>
        )}
        {showCursor && <span className="inline-block w-0.5 h-1em bg-white/70 ml-0.5 animate-pulse" />}
      </>
    );
  };

  return (
    <div>
      {lines.map((line, index) => {
        const isVisible = index <= currentLineIndex;
        if (!isVisible) return null;

        const Tag = line.tag || "p";
        return (
          <Tag key={index} className={line.className}>
            {renderLine(line, index)}
          </Tag>
        );
      })}
    </div>
  );
}
