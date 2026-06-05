export function HtmlReport({ html }: { html: string }) {
  return (
    <iframe
      title="HTML report"
      srcDoc={html}
      className="not-prose h-[80vh] w-full rounded-xl border border-white/20 bg-white"
      sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
    />
  );
}
