import waitlistModel from "@/lib/dbSchemas/waitlistSchema";
import dbConnect from "@/lib/dbConnect";
import zod from "zod";

const addWaitlistEmailBody = zod.object({
  waitlistId: zod.string(),
  waitlistEmail: zod.string().email(),
});

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

  return Response.json(
    {
      displayWaitlist: displayWaitlist,
    },
    { status: 200 }
  );
}

export async function POST(req: Request) {
  const parsedBody = await req.json();
  const { success } = addWaitlistEmailBody.safeParse(parsedBody);

  if (!success) {
    return Response.json(
      {
        message: "invalid email",
      },
      { status: 411 }
    );
  }

  await dbConnect();
  const { waitlistId, waitlistEmail } = parsedBody;

  const waitlist: any = await waitlistModel.findOne({
    _id: waitlistId,
  });

  if (!waitlist) {
    return Response.json(
      {
        message: "waitlist not found",
      },
      { status: 404 }
    );
  }

  const emailAlreadyExists = waitlist.waitlistEmails.includes(waitlistEmail);

  if (emailAlreadyExists) {
    return Response.json(
      {
        message: "email already added to waitlist",
      },
      { status: 409 }
    );
  }

  waitlist.waitlistEmails.push(waitlistEmail);
  await waitlist.save();

  return Response.json(
    {
      message: "email added to waitlist",
    },
    { status: 200 }
  );
}
