"use client";

import axios from "axios";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  async function setJWTToken() {
    try {
      const response = await axios.post("api/login", {
        token,
      });

      toast(response.data.message);

      router.replace("/dashboard");
    } catch (error: any) {
      toast(error.response.data.message);
    }
  }

  useEffect(() => {
    setJWTToken();
  }, []);

  return (
    <div>
      Loading ... <br /> Please wait for a bit
    </div>
  );
}
