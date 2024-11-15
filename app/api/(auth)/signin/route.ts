import dbConnect from "@/lib/dbConnect";
import userModel from "@/lib/dbSchemas/userSchema";
import zod from "zod";
import { sendLoginEmail } from "@/lib/sendEmail";

const signinBody = zod.object({
  email: zod.string().email(),
});

export async function POST(req: Request) {
  const parsedBody = await req.json();
  const { success } = signinBody.safeParse(parsedBody);

  if (!success) {
    return Response.json(
      {
        message: "incorrect email",
      },
      { status: 411 }
    );
  }

  await dbConnect();
  const origin = req.headers.get("origin") || "";
  const { email } = parsedBody;

  const token = [...Array(10)]
    .map(() => Math.random().toString(36)[2])
    .join("");

  const user = await userModel.findOneAndUpdate(
    {
      email: email,
    },
    {
      $set: {
        token: token,
      },
    }
  );

  if (user) {
    await sendLoginEmail(email, user.firstName, token, origin);

    return Response.json(
      {
        message: "please check email to login.",
      },
      { status: 200 }
    );
  } else {
    return Response.json(
      {
        message: "no user exists with given email",
      },
      { status: 404 }
    );
  }
}
