import { createStats, findVideoIdByUser, updateStats } from "@/lib/db/hasura";
import { verifyToken } from "@/lib/utils/verifiyToken";
import jwt from "jsonwebtoken";

import { NextApiRequest, NextApiResponse } from "next";

interface DecodedToken {
  issuer: string;
}

const stats = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Finding related video correspand to the user
    const token = req.cookies["next-auth.session-token"];
    if (!token) {
      res
        .status(403)
        .send({ success: false, error: "No videoId is provided", code: 403 });
    } else {
      // let decodedToken = jwt.verify(
      //   token,
      //   process.env.JWT_SECRET as string,
      // ) as DecodedToken;

      const userId = await verifyToken(token);
      console.log({ userId });

      const videoId = req.body.videoId || req.query.videoId;
      if (!userId) {
        res.status(403).send({
          success: false,
          error: "User was not found",
          videoId,
          code: 403,
        });
        return;
      }
      if (!videoId) {
        res.status(422).send({
          success: false,
          error: "No videoId is provided",
          videoId,
          code: 422,
        });
      }

      const findVideo = await findVideoIdByUser({
        userId,
        videoId,
        token,
      });

      const doesStatsExists = findVideo && findVideo?.length > 0;

      if (req.method === "POST") {
        // handle post request to tweak stats: facourited & watched
        const { favourited, watched = true, title } = req.body;

        if (doesStatsExists) {
          //  Favourited is set to be optional, if its not provided it would tweak it
          let favouritedHolder = favourited;
          if (!favouritedHolder) {
            favouritedHolder = findVideo[0].favourited === 0 ? 1 : 0;
          }

          const response = await updateStats({
            token,
            favourited: favouritedHolder,
            watched,
            userId,
            videoId,
          });
          res.send({
            success: true,
            data: response,
            doesStatsExists,
            video: findVideo[0],
            code: 200,
          });
        } else {
          // const vidoCreated = await createVideo({
          //   token,
          //   title,
          //   videoId,
          // });
          const response = await createStats({
            token,
            favourited,
            watched,
            userId,
            videoId,
          });
          res.send({
            success: true,
            data: response,
            doesStatsExists,
            code: 200,
          });
        }
      } else {
        //  Get Request
        if (doesStatsExists) {
          res.send({ success: true, video: findVideo[0], code: 200 });
        } else {
          res.status(404).send({
            success: true,
            error: "Video not Found",
            user: null,
            code: 404,
          });
        }
      }
    }
  } catch (error: any) {
    res.status(500).send({ success: false, error, code: 500 });
  }
};

export default stats;
