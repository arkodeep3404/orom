import dbConnect from "@/lib/dbConnect";
import User from "@/lib/dbSchema";
import zod from "zod";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

const signinBody = zod.object({
  token: zod.string(),
});

export async function POST(req: Request) {
  await dbConnect();
  const parsedBody = await req.json();

  const { token } = parsedBody;
  const { success } = signinBody.safeParse(parsedBody);

  if (!success) {
    return Response.json(
      {
        message: "incorrect token",
      },
      { status: 411 }
    );
  }

  const user = await User.findOneAndUpdate(
    {
      token: token,
    },
    {
      $set: {
        token: "",
      },
    }
  );

  if (user) {
    const userId: any = user._id;

    const jwtToken = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setJti(userId)
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    cookies().set("orom_auth", jwtToken);

    return Response.json(
      {
        message: "cookie set successfully",
      },
      { status: 200 }
    );
  } else {
    return Response.json(
      {
        message: "no user exists",
      },
      { status: 404 }
    );
  }
}
