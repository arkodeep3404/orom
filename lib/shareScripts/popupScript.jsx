import React from "react";
import ReactDOM from "react-dom/client";
import { toast, Toaster } from "sonner";

const popupId = document.currentScript.getAttribute("popupId");
const origin = document.currentScript.getAttribute("origin");

function PopUp() {
  fetch(`${origin}/api/shareScripts/popupScript`, {
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
          toast(details.popupTitle, {
            description: details.popupDescription,
            duration: details.popupDuration * 1000,
          });
        }, details.popupStart * 1000);
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
