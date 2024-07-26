import waitlistModel from "@/lib/dbSchemas/waitlistSchema";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: Request) {
  await dbConnect();
  const waitlistId = req.headers.get("waitlistId");

  const displayWaitlist = await waitlistModel.findOne({
    _id: waitlistId,
  });

  if (!displayWaitlist) {
    return Response.json(
      {
        message: "waitlist not found",
      },
      { status: 404 }
    );
  }

  console.log(displayWaitlist);
  

  return Response.json(
    {
      displayWaitlist: displayWaitlist,
    },
    { status: 200 }
  );
}
