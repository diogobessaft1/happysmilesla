import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Shared eyebrow + title + subtitle block so every section shares one rhythm.
 * `tone="dark"` is for the navy sections, `tone="light"` for the white ones.
 */
export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) => {
  const onDark = tone === "dark";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em]",
            onDark
              ? "bg-brand-onDark/10 text-brand-cyan-light ring-1 ring-inset ring-brand-onDark/20"
              : "bg-secondary text-brand-navy ring-1 ring-inset ring-brand-cyan/25",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "max-w-3xl text-3xl leading-[1.15] sm:text-4xl lg:text-[2.6rem]",
          onDark ? "text-brand-onDark" : "text-brand-navy",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            onDark ? "text-brand-onDark/75" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
};
