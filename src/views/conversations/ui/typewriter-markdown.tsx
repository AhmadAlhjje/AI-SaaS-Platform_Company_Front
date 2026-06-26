"use client";

import { useEffect, useRef, useState } from "react";
import { MarkdownContent } from "./markdown-content";

const CHARS_PER_TICK = 4;
const TICK_MS = 16;

interface TypewriterMarkdownProps {
  content: string;
  onDone?: () => void;
}

// Simulates token streaming over an already-fetched full reply — the backend
// returns the AI message in one response, so "streaming" here is a reveal
// effect on the client rather than true SSE from the LLM provider. Callers
// must render this with `key={message.id}` so a new message remounts (and
// resets reveal progress) instead of reusing state across different content.
export function TypewriterMarkdown({ content, onDone }: TypewriterMarkdownProps) {
  const [visibleLength, setVisibleLength] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (visibleLength >= content.length) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
      return;
    }

    const timeout = setTimeout(() => {
      setVisibleLength((length) => Math.min(length + CHARS_PER_TICK, content.length));
    }, TICK_MS);

    return () => clearTimeout(timeout);
  }, [visibleLength, content, onDone]);

  return <MarkdownContent content={content.slice(0, visibleLength)} />;
}
