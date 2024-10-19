import popupModel from "@/lib/dbSchemas/popupSchema";
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
