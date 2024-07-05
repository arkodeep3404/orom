import { ReactNode } from "react";

const mdxStyles = {
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="bg-green-600"> {children} </h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="bg-blue-600"> {children} </h2>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="bg-red-600"> {children} </p>
  ),
};

export { mdxStyles };
