import * as React from "react";
import { cn } from "@/components/ui/utils";

type ButtonSize = "default" | "large" | "small";
type ButtonVariant = "primary" | "secondary" | "destructive" | "outline" | "ghost" | "ice";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", fullWidth, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants: Record<ButtonVariant, string> = {
      primary: "bg-brand-dark text-white hover:bg-[#142846]",
      secondary: "bg-blue-50 text-brand-dark hover:bg-blue-100",
      destructive: "bg-rose-600 text-white hover:bg-rose-700",
      outline: "border border-gray-200 bg-white hover:bg-gray-50",
      ghost: "hover:bg-gray-100 hover:text-brand-dark",
      ice: "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-200/50",
    };

    const sizes: Record<ButtonSize, string> = {
      default: "h-10 px-4 py-2",
      large: "h-12 px-8 py-3 text-base",
      small: "h-8 px-3 py-1.5 text-xs",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], fullWidth && "w-full", className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };