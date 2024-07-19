"use client";

import { Button } from "@/components/ui/button";
import ExistingListCard from "@/components/dashboard/existingListCard";
import CreateNewDialog from "@/components/dashboard/createNewDialog";
import { popupsList } from "@/store/atoms";
import { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRecoilState } from "recoil";

export default function PopupDashboard() {
  const [popupsListContent, setPopupsListContent] = useRecoilState(popupsList);

  async function fetchPopups() {
    const response = await axios.get("/api/dashboard/popups");
    setPopupsListContent(response.data.popups);
  }

  useEffect(() => {
    fetchPopups();
  }, []);

  return (
    <div>
      <div className="flex w-[calc(100vw-5rem)] justify-end m-10">
        <CreateNewDialog
          trigger={<Button> Create new </Button>}
          service="popups"
        />
      </div>

      <div className="flex">
        {popupsListContent.map((data, index) => (
          <Link key={index} href={`/dashboard/popups/edit/${data._id}`}>
            <ExistingListCard key={index} title={data.popupName} />
          </Link>
        ))}
      </div>
    </div>
  );
}
