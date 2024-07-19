import { popupModel } from "@/lib/dbSchema";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: Request) {
  await dbConnect();

  const userId = req.headers.get("userId");
  const popupId = req.headers.get("popupId");

  const currentPopup = await popupModel.findOne({
    userId: userId,
    _id: popupId,
  });

  if (!currentPopup) {
    return Response.json(
      {
        message: "popup not found",
      },
      { status: 404 }
    );
  }

  return Response.json(
    {
      currentPopup: currentPopup,
    },
    { status: 200 }
  );
}
