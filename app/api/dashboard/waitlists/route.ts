import WaitlistModel from "@/lib/dbSchemas/waitlistSchema";
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

  const waitlists = await WaitlistModel.find({
    userId: userId,
  });

  if (!waitlists) {
    return Response.json(
      {
        message: "no waitlists exist",
      },
      { status: 404 }
    );
  }

  return Response.json(
    {
      waitlists: waitlists,
    },
    { status: 200 }
  );
}
