import { popupModel } from "@/lib/dbSchema";
import zod from "zod";
import dbConnect from "@/lib/dbConnect";

const popupsBody = zod.object({
  popupDetails: zod.array(
    zod.object({
      id: zod.string(),
      title: zod.string(),
      description: zod.string(),
      duration: zod.number(),
      start: zod.number(),
    })
  ),
  popupUId: zod.string(),
});

export async function POST(req: Request) {
  await dbConnect();

  const userId = req.headers.get("userId");
  const parsedBody = await req.json();

  const { success } = popupsBody.safeParse(parsedBody);
  const { popupDetails, popupUId } = parsedBody;

  console.log(parsedBody);

  if (!success) {
    return Response.json(
      {
        message: "incorrect inputs",
      },
      { status: 411 }
    );
  }

  const existingPopup = await popupModel.findOne({
    userId: userId,
    popupUId: popupUId,
  });

  if (existingPopup) {
    return Response.json(
      {
        message: "popup already exists",
      },
      { status: 411 }
    );
  }

  const popup = await popupModel.create({
    userId: userId,
    popupUId: popupUId,
    popupDetails: popupDetails,
  });

  return Response.json(
    {
      message: "popup created and saved",
    },
    { status: 200 }
  );
}
