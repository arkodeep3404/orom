"use client";

import { Button } from "@/components/ui/button";
import ExistingListCard from "@/components/dashboard/existingListCard";
import CreateNewDialog from "@/components/dashboard/createNewDialog";
import { waitlistsList } from "@/lib/stateStore/waitlistsState";
import { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRecoilState } from "recoil";

export default function WaitlistDashboard() {
  const [waitlistsListContent, setWaitlistsListContent] =
    useRecoilState(waitlistsList);

  async function fetchWaitlists() {
    const response = await axios.get("/api/dashboard/waitlists");
    setWaitlistsListContent(response.data.waitlists);
  }

  useEffect(() => {
    fetchWaitlists();
  }, []);

  return (
    <div>
      <div className="flex w-[calc(100vw-5rem)] justify-end m-10">
        <CreateNewDialog
          trigger={<Button> Create new </Button>}
          service="waitlists"
        />
      </div>

      <div className="flex">
        {waitlistsListContent.map((data, index) => (
          <Link key={index} href={`/dashboard/waitlists/edit/${data._id}`}>
            <ExistingListCard key={index} title={data.waitlistName} />
          </Link>
        ))}
      </div>
    </div>
  );
}
