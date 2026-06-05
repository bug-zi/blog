import { getReportPublicUrl } from "@/lib/report-storage";

type ReportFrameProps = {
  path?: string;
  src?: string;
  title?: string;
};

function getSrc({ path, src }: ReportFrameProps) {
  if (path) return getReportPublicUrl(path);
  if (src && /^https:\/\//i.test(src)) return src;
  return "";
}

export function ReportFrame(props: ReportFrameProps) {
  const src = getSrc(props);

  if (!src) return null;

  return (
    <iframe
      title={props.title || "HTML report"}
      src={src}
      className="not-prose h-[80vh] w-full rounded-xl border border-white/20 bg-white"
      sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
    />
  );
}

