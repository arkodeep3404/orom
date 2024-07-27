"use client";

import DashboardServices from "@/components/dashboard/dashboardServices";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Dashboard() {
  const router = useRouter();

  async function logout() {
    const response = await axios.post("/api/logout");
    toast(response.data.message);
    router.replace("/signin");
  }

  return (
    <div>
      <div className="flex w-[calc(100vw-5rem)] justify-end m-10">
        <Button onClick={logout}> Logout </Button>
      </div>

      <div className="flex lg:items-center">
        <DashboardServices />
      </div>
    </div>
  );
}
