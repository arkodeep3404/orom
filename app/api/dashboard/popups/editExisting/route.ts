import popupModel from "@/lib/dbSchemas/popupSchema";
import zod from "zod";
import dbConnect from "@/lib/dbConnect";

const popupsBody = zod.object({
  popupId: zod.string(),
  popupDetails: zod.array(
    zod.object({
      _id: zod.string(),
      popupTitle: zod.string(),
      popupDescription: zod.string(),
      popupDuration: zod.number(),
      popupStart: zod.number(),
    })
  ),
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
  const { success } = popupsBody.safeParse(parsedBody);

  if (!success) {
    return Response.json(
      {
        message: "incorrect inputs",
      },
      { status: 411 }
    );
  }

  await dbConnect();
  const { popupId, popupDetails } = parsedBody;

  const existingPopup = await popupModel.findOneAndUpdate(
    {
      userId: userId,
      _id: popupId,
    },
    {
      $set: {
        popupDetails: popupDetails,
      },
    }
  );

  if (!existingPopup) {
    return Response.json(
      {
        message: "popup not found",
      },
      { status: 404 }
    );
  }

  return Response.json(
    {
      message: "popup updated and saved",
    },
    { status: 200 }
  );
}
