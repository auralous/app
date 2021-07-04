import { ReactNode } from "react";

export const shouldRenderChildrenAsText = (children: ReactNode) =>
  Array.isArray(children)
    ? typeof children[0] === "string"
    : typeof children === "string";
