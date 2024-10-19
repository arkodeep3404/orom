import userModel from "@/lib/dbSchemas/userSchema";
import zod from "zod";
import dbConnect from "@/lib/dbConnect";
import { sendLoginEmail } from "@/lib/sendEmail";

const signupBody = zod.object({
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
});

export async function POST(req: Request) {
  const parsedBody = await req.json();
  const { success } = signupBody.safeParse(parsedBody);

  if (!success) {
    return Response.json(
      {
        message: "incorrect inputs",
      },
      { status: 411 }
    );
  }

  await dbConnect();
  const { firstName, lastName, email } = parsedBody;
  const origin = req.headers.get("origin") || "";

  const existingUser = await userModel.findOne({
    email: email,
  });

  if (existingUser) {
    return Response.json(
      {
        message: "email already exists",
      },
      { status: 411 }
    );
  }

  const token = [...Array(10)]
    .map(() => Math.random().toString(36)[2])
    .join("");

  const newUser = await userModel.create({
    email: email,
    firstName: firstName,
    lastName: lastName,
    token: token,
  });

  await sendLoginEmail(email, firstName, token, origin);

  return Response.json(
    {
      message: "user created. please check email to login.",
    },
    { status: 200 }
  );
}
