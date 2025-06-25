import type { ElementType, ComponentPropsWithoutRef } from "react";

type AsProp<T extends ElementType> = {
  as?: T;
  asChild?: boolean;
};

type PropsToOmit = keyof AsProp<ElementType> | "className";

export type TypographyProps<T extends ElementType = "div"> = AsProp<T> &
  Omit<ComponentPropsWithoutRef<T>, PropsToOmit> & {
    className?: string;
  };
