import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { toast, Toaster } from "sonner";

const userId = document.currentScript.getAttribute("userId");
const popupId = document.currentScript.getAttribute("popupId");
const endpoint =
  location?.hostname === "orom.club"
    ? "https://orom.club/api/script"
    : "http://localhost:3000/api/script";

function PopUp() {
  fetch(endpoint, {
    method: "GET",
    headers: {
      userId: userId,
      popupId: popupId,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.displayPopup.popupDetails);
    })
    .catch((error) => {
      console.error(error);
    });

  useEffect(() => {
    const timeout = setTimeout(() => {
      toast("hello there");
      toast("hello there 2");
      toast("hello there 3");
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return <Toaster />;
}

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
ReactDOM.createRoot(rootElement).render(<PopUp />);
