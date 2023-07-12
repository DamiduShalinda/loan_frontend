import React, { forwardRef, Ref } from "react";

export const Recipts = forwardRef<HTMLDivElement>((props, ref: Ref<HTMLDivElement>) => {
  return <div ref={ref}>My cool content here!</div>;
});
