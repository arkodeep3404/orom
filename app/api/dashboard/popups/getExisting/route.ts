import { popupModel } from "@/lib/dbSchema";
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
