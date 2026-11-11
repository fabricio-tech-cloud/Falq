import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  /** Visual height of the logo in pixels */
  height?: number;
  priority?: boolean;
};

/** Trimmed source aspect ratio (563 × 373). */
const LOGO_ASPECT = 563 / 373;

export function BrandLogo({
  className = "",
  height = 56,
  priority = false,
}: BrandLogoProps) {
  const width = Math.round(height * LOGO_ASPECT);

  return (
    <Image
      src="/brand/falq-mark.png"
      alt="FALQ"
      width={width}
      height={height}
      className={`brand-logo ${className}`.trim()}
      priority={priority}
      sizes="(max-width: 640px) 120px, 160px"
    />
  );
}
