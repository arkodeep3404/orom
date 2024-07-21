import React from "react";
import ReactDOM from "react-dom/client";
import { toast, Toaster } from "sonner";

const popupId = document.currentScript.getAttribute("popupId");
const origin = document.currentScript.getAttribute("origin");

function PopUp() {
  fetch(`${origin}/api/script`, {
    method: "GET",
    headers: {
      popupId: popupId,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const popupDetails = data.displayPopup.popupDetails;
      popupDetails.map((details) => {
        setTimeout(() => {
          toast(details.title, {
            description: details.description,
            duration: details.duration * 1000,
          });
        }, details.start * 1000);
      });
    })
    .catch((error) => {
      console.error(error);
    });

  return <Toaster position="top-right" expand />;
}

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
ReactDOM.createRoot(rootElement).render(<PopUp />);
