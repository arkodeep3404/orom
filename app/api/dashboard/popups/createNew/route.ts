import { popupModel } from "@/lib/dbSchema";
import zod from "zod";
import dbConnect from "@/lib/dbConnect";

const createPopupBody = zod.object({
  popupsName: zod.string(),
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

  await dbConnect();
  const parsedBody = await req.json();

  const { success } = createPopupBody.safeParse(parsedBody);
  const { popupsName } = parsedBody;

  if (!success) {
    return Response.json(
      {
        message: "incorrect inputs",
      },
      { status: 411 }
    );
  }

  const popup = await popupModel.create({
    userId: userId,
    popupName: popupsName,
  });

  return Response.json(
    {
      message: "popup created and saved",
    },
    { status: 200 }
  );
}
