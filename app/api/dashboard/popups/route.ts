import { popupModel } from "@/lib/dbSchema";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: Request) {
  await dbConnect();
  const userId = req.headers.get("userId");

  const popups = await popupModel.find({
    userId: userId,
  });

  if (!popups) {
    return Response.json(
      {
        message: "no popups exist",
      },
      { status: 404 }
    );
  }

  return Response.json(
    {
      popups: popups,
    },
    { status: 200 }
  );
}
