import jwt from "jsonwebtoken";

interface DecodedToken {
  issuer: string;
  sub: string;
}

export async function verifyToken(token: string) {
  let decodedToken = jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  ) as DecodedToken;
  console.log({ decodedToken });

  const userId = decodedToken?.sub || null;
  return userId;
}
