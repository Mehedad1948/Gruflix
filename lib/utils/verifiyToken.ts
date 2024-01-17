import jwt from "jsonwebtoken";

interface DecodedToken {
  issuer: string;
}

export async function verifyToken(token: string) {
  let decodedToken = jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  ) as DecodedToken;

  const userId = decodedToken?.issuer || null;
  return userId;
}
