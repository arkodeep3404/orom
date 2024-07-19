import { popupModel } from "@/lib/dbSchema";
import zod from "zod";
import dbConnect from "@/lib/dbConnect";

const popupsBody = zod.object({
  popupId: zod.string(),
  popupDetails: zod.array(
    zod.object({
      _id: zod.string(),
      title: zod.string(),
      description: zod.string(),
      duration: zod.number(),
      start: zod.number(),
    })
  ),
});

export async function POST(req: Request) {
  await dbConnect();

  const userId = req.headers.get("userId");
  const parsedBody = await req.json();

  const { success } = popupsBody.safeParse(parsedBody);
  const { popupId, popupDetails } = parsedBody;

  if (!success) {
    return Response.json(
      {
        message: "incorrect inputs",
      },
      { status: 411 }
    );
  }

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
