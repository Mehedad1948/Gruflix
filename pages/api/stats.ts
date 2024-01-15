import { createStats, findVideoIdByUser, updateStats } from "@/lib/db/hasura";
import jwt from "jsonwebtoken";

import { NextApiRequest, NextApiResponse } from "next";

interface DecodedToken {
  issuer: string;
}

const stats = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Finding related video correspand to the user
    const token = req.cookies.token;
    if (!token) {
      res.status(403).send("Not Allowed");
    } else {
      let decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as DecodedToken;

      const userId = decodedToken.issuer;
      const videoId = req.body.videoId || req.query.videoId;
      if (!videoId) {
        res
          .status(422)
          .send({ done: false, error: "No videoId is provided", videoId });
      }

      const findVideo = await findVideoIdByUser({
        userId,
        videoId,
        token,
      });

      const doesStatsExists = findVideo && findVideo?.length > 0;

      if (req.method === "POST") {
        // handle post request to tweak stats: facourited & watched
        const { favourited, watched = true } = req.body;

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
          res.send({ done: true, data: response, doesStatsExists, video: findVideo[0] });
        } else {
          const response = await createStats({
            token,
            favourited,
            watched,
            userId,
            videoId,
          });
          res.send({ done: true, data: response, doesStatsExists });
        }
      } else {
        //  Get Request
        if (doesStatsExists) {
          res.send({ done: true, video: findVideo[0] });
        } else {
          res
            .status(404)
            .send({ done: true, msg: "Video not Found", user: null });
        }
      }
    }
  } catch (error: any) {
    res.status(500).send({ done: false, error });
  }
};

export default stats;
