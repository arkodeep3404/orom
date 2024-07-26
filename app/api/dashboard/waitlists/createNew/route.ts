import waitlistModel from "@/lib/dbSchemas/waitlistSchema";
import zod from "zod";
import dbConnect from "@/lib/dbConnect";

const createWaitlistBody = zod.object({
  waitlistsName: zod.string(),
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
  const { success } = createWaitlistBody.safeParse(parsedBody);

  if (!success) {
    return Response.json(
      {
        message: "incorrect inputs",
      },
      { status: 411 }
    );
  }

  await dbConnect();
  const { waitlistsName } = parsedBody;

  const waitlist = await waitlistModel.create({
    userId: userId,
    waitlistName: waitlistsName,
  });

  return Response.json(
    {
      message: "waitlist created and saved",
    },
    { status: 200 }
  );
}
