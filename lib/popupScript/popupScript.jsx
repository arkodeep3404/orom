import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { toast, Toaster } from "sonner";

function PopUp() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      toast("hello there");
      toast("hello there 2");
      toast("hello there 3");
    });

    return () => clearTimeout(timeout);
  }, []);

  return <Toaster />;
}

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
ReactDOM.createRoot(rootElement).render(<PopUp />);
