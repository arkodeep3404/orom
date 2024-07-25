import waitlistModel from "@/lib/dbSchemas/waitlistSchema";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: Request) {
  const userId = req.headers.get("userId");

  if (!userId) {
    return Response.json(
      {
        message: "userId not found. please login",
      },
      { status: 401 }
    );
  }

  await dbConnect();
  const waitlistId = req.headers.get("waitlistId");

  const currentWaitlist = await waitlistModel.findOne({
    userId: userId,
    _id: waitlistId,
  });

  if (!currentWaitlist) {
    return Response.json(
      {
        message: "waitlist not found",
      },
      { status: 404 }
    );
  }

  return Response.json(
    {
      currentWaitlist: currentWaitlist,
    },
    { status: 200 }
  );
}
