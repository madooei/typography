import { cn } from "@/lib/utils";
import type { TypographyProps } from "@/types";
import { forwardRef, type ElementType } from "react";

const TypographyComponent = forwardRef<
  HTMLElement,
  TypographyProps<ElementType>
>(({ children, className, as, ...props }, ref) => {
  const Component = as || "div";

  return (
    <Component ref={ref} className={cn("typography", className)} {...props}>
      {children}
    </Component>
  );
});

TypographyComponent.displayName = "Typography";

export const Typography = TypographyComponent as <
  T extends ElementType = "div",
>(
  props: TypographyProps<T> & { ref?: React.Ref<HTMLElement> },
) => JSX.Element;
