import { cookies } from "next/headers";

export async function POST(req: Request) {
  cookies().delete("orom_auth");

  return Response.json(
    {
      message: "cookie deleted successfully",
    },
    { status: 200 }
  );
}
