"use client";

import { Button } from "@/components/ui/button";
import ExistingListCard from "@/components/dashboard/existingListCard";
import CreateExistingDialog from "@/components/dashboard/createNewDialog";
import { useEffect, useState } from "react";
import axios from "axios";
import { Popup } from "@/lib/dbSchema";

export default function PopupDashboard() {
  const [popupsList, setPopupsList] = useState<Array<Popup>>([]);

  async function fetchPopups() {
    const response = await axios.get("/api/dashboard/popup");
    setPopupsList(response.data.popups);
    console.log(response.data.popups);
  }

  useEffect(() => {
    fetchPopups();
  }, []);

  return (
    <div>
      <div className="flex w-[calc(100vw-5rem)] justify-end m-10">
        <CreateExistingDialog
          trigger={<Button> Create new </Button>}
          service="popup"
        />
      </div>

      {popupsList.map((data, index) => (
        <ExistingListCard key={index} title={data.popupName} />
      ))}
    </div>
  );
}
