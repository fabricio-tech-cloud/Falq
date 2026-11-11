"use client";

/**
 * @author: @kokonut-labs
 * @description: Slide Text Button with animated vertical text transition
 * @version: 1.0.0
 * @date: 2025-11-02
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import Link from "next/link";
import { cn } from "@/lib/utils";

type CommonProps = {
  text?: string;
  hoverText?: string;
  className?: string;
  variant?: "default" | "ghost";
  /** Fades and slides the button in when it mounts. */
  animateIn?: boolean;
};

type LinkProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    as?: "link";
    href?: string;
    type?: never;
  };

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
    as: "button";
    href?: never;
    type?: "button" | "submit" | "reset";
  };

type SlideTextButtonProps = LinkProps | ButtonProps;

const baseClassName =
  "group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg px-8 font-medium text-base tracking-tighter transition-[background-color,scale,opacity,translate] duration-[150ms,150ms,200ms,200ms] ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2 active:scale-[0.97] motion-reduce:active:scale-100 md:min-w-56";

export default function SlideTextButton(props: SlideTextButtonProps) {
  const {
    text = "Browse Components",
    hoverText,
    className,
    variant = "default",
    animateIn = true,
    as = "link",
    ...rest
  } = props;

  const slideText = hoverText ?? text;
  const variantStyles =
    variant === "ghost"
      ? "border border-[var(--line)] text-[var(--ink)] hover:bg-[color-mix(in_srgb,var(--accent)_12%,transparent)]"
      : "bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[color-mix(in_srgb,var(--accent)_88%,white)]";

  const classes = cn(
    baseClassName,
    animateIn &&
      "starting:translate-x-2 starting:opacity-0 motion-reduce:starting:translate-x-0",
    variantStyles,
    className
  );

  const label = (
    <span className="grid justify-items-center transition-transform duration-200 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none">
      <span className="col-start-1 row-start-1 flex items-center gap-2 opacity-100 transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0">
        <span className="font-medium">{text}</span>
      </span>
      <span
        aria-hidden="true"
        className="col-start-1 row-start-1 flex translate-y-full items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <span className="font-medium">{slideText}</span>
      </span>
    </span>
  );

  if (as === "button") {
    const { type = "button", ...buttonProps } =
      rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button type={type} className={classes} {...buttonProps}>
        {label}
      </button>
    );
  }

  const { href = "/docs", ...linkProps } =
    rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string };

  return (
    <Link className={classes} href={href} {...linkProps}>
      {label}
    </Link>
  );
}
