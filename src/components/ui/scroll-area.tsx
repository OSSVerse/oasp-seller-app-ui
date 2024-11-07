import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

// sccrollArea
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    type="always"
    ref={ref}
    className={cn(
      "h-[185px] w-full overflow-hidden rounded bg-white",
      className,
    )}
    {...props}
  >
    <ScrollAreaViewPort>{children}</ScrollAreaViewPort>
    <ScrollAreaScrollbar>
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

// view port
const ScrollAreaViewPort = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Viewport
    ref={ref}
    className={cn("size-full", className)}
    {...props}
  >
    {children}
  </ScrollAreaPrimitive.Viewport>
));
ScrollAreaViewPort.displayName = ScrollAreaPrimitive.Viewport.displayName;

// scrollbar
const ScrollAreaScrollbar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Scrollbar
    ref={ref}
    className={cn(
      "flex touch-none select-none p-0.5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-3 data-[orientation=horizontal]:flex-col",
      className,
    )}
    orientation="vertical"
    {...props}
  >
    {children}
  </ScrollAreaPrimitive.Scrollbar>
));

ScrollAreaScrollbar.displayName = ScrollAreaPrimitive.Scrollbar.displayName;

// thumb
const ScrollAreaThumb = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Thumb>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Thumb>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Thumb
    ref={ref}
    className={cn(
      "relative flex-1 rounded-[10px] bg-neutral-200 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-[44px] before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2",
      className,
    )}
    {...props}
  />
));

ScrollAreaThumb.displayName = ScrollAreaPrimitive.Thumb.displayName;

// corner
const ScrollAreaCorner = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Corner>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Corner>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Corner
    ref={ref}
    className={cn("bg-blackA5", className)}
    {...props}
  />
));

ScrollAreaCorner.displayName = ScrollAreaPrimitive.Corner.displayName;

export { ScrollArea };
