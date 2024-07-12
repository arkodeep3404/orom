export function GET(req: Request) {
  const userId = req.headers.get("userId");

  return Response.json({
    userId: userId,
  });
}
