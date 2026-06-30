interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionTitleProps) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col ${alignCls} gap-4 mb-12 md:mb-16`}>
      {eyebrow && (
        <span className="divider-gold">
          <span className="divider-gold-line" />
          {eyebrow}
          <span className="divider-gold-line" />
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground text-balance max-w-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl text-balance">
          {subtitle}
        </p>
      )}
    </div>
  );
}
