import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/Spinner";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  /** Shows a spinner in place of the icon and blocks interaction, without changing the label. */
  loading?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-text-inverse hover:bg-primary-hover shadow-xs hover:shadow-sm",
  secondary:
    "bg-surface-raised text-text-primary border border-border-strong hover:border-ink-900",
  ghost: "text-text-secondary hover:bg-ink-50 hover:text-text-primary",
  destructive: "bg-error text-white hover:bg-danger-600 shadow-xs hover:shadow-sm",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-small gap-1.5",
  md: "h-11 px-5 text-body gap-2",
  lg: "h-[3.25rem] px-6 text-body gap-2.5",
};

const spinnerSize: Record<ButtonSize, number> = { sm: 13, md: 15, lg: 17 };

const baseStyles =
  "inline-flex items-center justify-center rounded-(--radius-md) font-medium transition-colors duration-(--duration-hover) disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2";

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "left",
    loading = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
  const leadingIcon = loading ? (
    <Spinner size={spinnerSize[size]} decorative />
  ) : (
    icon
  );

  const content = (
    <>
      {leadingIcon && iconPosition === "left" ? leadingIcon : null}
      {children}
      {leadingIcon && iconPosition === "right" ? leadingIcon : null}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} aria-disabled={loading || undefined}>
        {content}
      </Link>
    );
  }

  const { disabled, ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
