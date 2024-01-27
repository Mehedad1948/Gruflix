// import { setCookie } from "@/lib/cookies/setCookie";
// import { createNewUser, isNewUser } from "@/lib/db/hasura";
// import { magicAdmin } from "@/lib/magic";
// import jwt from "jsonwebtoken";

// import { NextApiRequest, NextApiResponse } from "next";

// export default async function login(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     try {
//       const auth = req.headers.authorization;
//       const didToken = auth ? auth.substr(7) : "";
//       console.log("req.body", req.body);

//       const metadata = await magicAdmin.users.getMetadataByToken(didToken);
//       console.log({ metadata });

//       const token = jwt.sign(
//         {
//           ...metadata,
//           iat: Math.floor(Date.now() / 1000),
//           exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
//           "https://hasura.io/jwt/claims": {
//             "x-hasura-default-role": "user",
//             "x-hasura-allowed-roles": ["user", "admin"],
//             "x-hasura-user-id": `${metadata.issuer}`,
//           },
//         },
//         process.env.JWT_SECRET as string,
//       );

//       const isNewUserQuery = metadata.issuer
//         ? await isNewUser(token, metadata.issuer)
//         : false;

//       const cookie = setCookie("token", token, 7);

//       if (isNewUserQuery) await createNewUser(token, metadata);

//       res.setHeader("Set-Cookie", cookie);

//       res.send({ done: true, isNewUserQuery, metadata });
//     } catch (err) {
//       console.log({ err });
//       res.status(500).send({ err });
//     }
//   } else {
//     res.send({ done: false });
//   }
// }
