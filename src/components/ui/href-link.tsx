import { cn } from "@/lib/utils";
import React from "react";

interface HrefLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: string;
  className?: string;
}

const HrefLink = React.forwardRef<HTMLAnchorElement, HrefLinkProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <a
        href={children}
        target="_blank"
        ref={ref}
        title={children}
        className={cn("underline hover:no-underline", className)}
        {...props}
      >
        {children}
      </a>
    );
  },
);

export default HrefLink;
