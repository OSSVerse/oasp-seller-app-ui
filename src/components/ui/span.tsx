import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spanVariants = cva("", {
  variants: {
    variant: {
      default: "text-primary",
      success: "text-green-500",
      progress: "text-sky-500",
      pending: "text-amber-500",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface SpanProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spanVariants> {}

function Span({ className, variant, ...props }: SpanProps) {
  return (
    <span className={cn(spanVariants({ variant }), className)} {...props} data-testid="span" />
  );
}

export { Span, spanVariants };
