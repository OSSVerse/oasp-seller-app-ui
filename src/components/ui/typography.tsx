import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "blockquote"
  | "code";

interface TypographyProps {
  as?: TypographyVariant;
  className?: string;
  children: ReactNode;
  muted?: boolean;
  id?: string;
}

const Typography = ({
  as = "p",
  className = "",
  children,
  muted,
  ...props
}: TypographyProps) => {
  const Component = as;

  const defaultClasses = {
    h1: "text-3xl font-bold",
    h2: "text-2xl font-semibold",
    h3: "text-xl font-medium",
    h4: "text-lg font-medium",
    p: "text-base",
    blockquote: "border-l-4 pl-4 italic",
    code: "bg-muted p-2 rounded text-sm font-mono",
    muted: "text-sm text-muted-foreground",
  };

  return (
    <Component
      className={cn(
        defaultClasses[as],
        muted && defaultClasses.muted,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const H1 = (props: TypographyProps) => <Typography as="h1" {...props} />;

export const H2 = (props: TypographyProps) => <Typography as="h2" {...props} />;

export const H3 = (props: TypographyProps) => <Typography as="h3" {...props} />;

export const H4 = (props: TypographyProps) => <Typography as="h4" {...props} />;

export const Paragraph = (props: TypographyProps) => (
  <Typography as="p" {...props} />
);

export const Blockquote = (props: TypographyProps) => (
  <Typography as="blockquote" {...props} />
);

export const Code = (props: TypographyProps) => (
  <Typography as="code" {...props} />
);

export const Muted = (props: TypographyProps) => (
  <Typography muted as="p" {...props} />
);

export default Typography;
