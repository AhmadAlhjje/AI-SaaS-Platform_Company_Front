import "highlight.js/styles/github-dark.css";

import ReactMarkdown, { type Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { cn } from "@/shared/lib/utils";

const markdownComponents: Components = {
  p: ({ children }) => <p className="mb-2 leading-relaxed last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="mb-2 list-disc ps-5 last:mb-0">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 list-decimal ps-5 last:mb-0">{children}</ol>,
  li: ({ children }) => <li className="mb-1">{children}</li>,
  h1: ({ children }) => <h1 className="mt-3 mb-2 text-lg font-bold first:mt-0">{children}</h1>,
  h2: ({ children }) => <h2 className="mt-3 mb-2 text-base font-bold first:mt-0">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-2 mb-1 text-sm font-bold first:mt-0">{children}</h3>,
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-border text-muted-foreground mb-2 border-s-2 ps-3 italic last:mb-0">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="mb-2 overflow-x-auto last:mb-0">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border-border border p-1.5 text-start font-medium">{children}</th>,
  td: ({ children }) => <td className="border-border border p-1.5">{children}</td>,
  pre: ({ children }) => (
    <pre className="mb-2 overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100 last:mb-0">{children}</pre>
  ),
  code: ({ className, children }) => {
    const isCodeBlock = className?.includes("language-") ?? false;

    if (!isCodeBlock) {
      return <code className="bg-muted rounded px-1 py-0.5 text-xs">{children}</code>;
    }

    return <code className={className}>{children}</code>;
  },
};

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={cn("text-sm", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
