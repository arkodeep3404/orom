import { Popup } from "@/lib/dbSchema";
import zod from "zod";
import dbConnect from "@/lib/dbConnect";

const popupsBody = zod.object({
  popupName: zod.string(),
});

export async function POST(req: Request) {
  await dbConnect();

  const userId = req.headers.get("userId");
  const parsedBody = await req.json();

  const { success } = popupsBody.safeParse(parsedBody);
  const { popupName } = parsedBody;

  console.log(parsedBody);

  if (!success) {
    return Response.json(
      {
        message: "incorrect inputs",
      },
      { status: 411 }
    );
  }

  const popup = await Popup.create({
    userId: userId,
    popupName: popupName,
  });

  return Response.json(
    {
      message: "popup created and saved",
    },
    { status: 200 }
  );
}
