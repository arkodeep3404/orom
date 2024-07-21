import { popupModel } from "@/lib/dbSchema";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: Request) {
  await dbConnect();
  const popupId = req.headers.get("popupId");

  const displayPopup = await popupModel.findOne({
    _id: popupId,
  });

  if (!displayPopup) {
    return Response.json(
      {
        message: "popup not found",
      },
      { status: 404 }
    );
  }

  return Response.json(
    {
      displayPopup: displayPopup,
    },
    { status: 200 }
  );
}
