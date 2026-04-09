import clsx from "clsx";

export function SentenceTags({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {tags.map((tag) => (
        <span
          key={tag}
          className={clsx(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            "bg-white/20 text-white/90 backdrop-blur-sm",
            "hover:bg-white/30 transition-colors duration-200",
            "border border-white/10"
          )}
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
