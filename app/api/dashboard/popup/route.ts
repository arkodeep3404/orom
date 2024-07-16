import { Popup } from "@/lib/dbSchema";
import zod from "zod";
import dbConnect from "@/lib/dbConnect";

const popupBody = zod.object({
  title: zod.string(),
  description: zod.string(),
  duration: zod.number(),
  start: zod.number(),
});

const popupsBody = zod.array(popupBody);

export async function POST(req: Request) {
  await dbConnect();

  const userId = req.headers.get("userId");
  const parsedBody = await req.json();

  const { popupCardsContent } = parsedBody;
  const { success } = popupsBody.safeParse(popupCardsContent);

  console.log(popupCardsContent);

  if (!success) {
    return Response.json(
      {
        message: "incorrect inputs",
      },
      { status: 411 }
    );
  }

  return Response.json({
    message: "saved",
  });
}
