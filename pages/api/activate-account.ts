import { createNewUser, isNewUser } from "@/lib/db/hasura";
import { sendEmail } from "@/lib/utils/sendEmail";
import jwt from "jsonwebtoken";

import { NextApiRequest, NextApiResponse } from "next";

export default async function activateAccount(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, url, subject } = JSON.parse(req.body);


    const send = await sendEmail(email, url, subject);
   
    res.send("Please check your email");
  }
}
