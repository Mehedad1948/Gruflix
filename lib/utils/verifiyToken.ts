import jwt from "jsonwebtoken";

interface DecodedToken {
  issuer: string;
  sub: string;
}

export async function verifyToken(token: string) {
  let decodedToken = jwt.verify(
    token,
    process.env.NEXT_PUBLIC_JWT_SECRET,
  ) as DecodedToken;
  console.log({ decodedToken });

  const userId = decodedToken?.sub || null;
  return userId;
}
