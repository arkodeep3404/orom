import waitlistModel from "@/lib/dbSchemas/waitlistSchema";
import zod from "zod";
import dbConnect from "@/lib/dbConnect";

const waitlistsBody = zod.object({
  waitlistId: zod.string(),
  waitlistContent: zod.object({
    waitlistTitle: zod.string(),
    waitlistDescription: zod.string(),
    socialUrls: zod.object({
      FacebookUrl: zod.string(),
      InstagramUrl: zod.string(),
      XUrl: zod.string(),
      YouTubeUrl: zod.string(),
      LinkedInUrl: zod.string(),
    }),
  }),
});

export async function POST(req: Request) {
  const userId = req.headers.get("userId");

  if (!userId) {
    return Response.json(
      {
        message: "userId not found. please login",
      },
      { status: 401 }
    );
  }

  const parsedBody = await req.json();
  const { success } = waitlistsBody.safeParse(parsedBody);

  if (!success) {
    return Response.json(
      {
        message: "incorrect inputs",
      },
      { status: 411 }
    );
  }

  await dbConnect();
  const { waitlistId, waitlistContent } = parsedBody;

  const existingWaitlist = await waitlistModel.findOneAndUpdate(
    {
      userId: userId,
      _id: waitlistId,
    },
    {           
      $set: {
        waitlistTitle: waitlistContent.waitlistTitle,
        waitlistDescription: waitlistContent.waitlistDescription,
        socialUrls: waitlistContent.socialUrls,
      },
    }
  );

  if (!existingWaitlist) {
    return Response.json(
      {
        message: "waitlist not found",
      },
      { status: 404 }
    );
  }

  return Response.json(
    {
      message: "waitlist updated and saved",
    },
    { status: 200 }
  );
}
