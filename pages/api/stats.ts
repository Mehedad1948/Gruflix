import { createStats, findVideoIdByUser, updateStats } from "@/lib/db/hasura";
import jwt from "jsonwebtoken";

import { NextApiRequest, NextApiResponse } from "next";

interface DecodedToken {
  issuer: string;
}

const stats = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.method);

  if (req.method === "POST") {
    const token = req.cookies.token;
    try {
      if (!token) {
        res.status(403).send("Not Allowed");
      } else {
        let decodedToken = jwt.verify(
          token,
          process.env.JWT_SECRET as string,
        ) as DecodedToken;

        const userId = decodedToken.issuer;
        const { videoId, favourited, watched = true } = req.body;

        if (!videoId) {
          res
            .status(422)
            .send({ done: false, error: "No videoId is provided" });
        }
        
        const findVideo = await findVideoIdByUser({
          userId,
          videoId,
          token,
        });

        const doesStatsExists = findVideo && findVideo?.length > 0;

        if (doesStatsExists) {
          //  Favourited is set to be optional, if its not provided it would
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
          res.send({ done: true, data: response, doesStatsExists, findVideo });
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

        // res.send({ done: true, doesStatsExists });
      }
    } catch (error: any) {
      res.status(500).send({ done: false, error });
    }
  } else {
    const token = req.cookies.token;
    console.log("Getting");

    try {
      if (!token) {
        res.status(403).send("Not Allowed");
      } else {
        let decodedToken = jwt.verify(
          token,
          process.env.JWT_SECRET as string,
        ) as DecodedToken;

        const userId = decodedToken.issuer;
        const { videoId } = req.query;
        console.log("my video id", videoId);

        if (!videoId) {
          res
            .status(422)
            .send({ done: false, error: "No videoId is provided" });
        }

        const findVideo = await findVideoIdByUser({
          userId,
          videoId: videoId as string,
          token,
        });

        const doesStatsExists = findVideo && findVideo?.length > 0;

        if (doesStatsExists) {
          res.send({ done: true, findVideo });
        } else {
          res
            .status(404)
            .send({ done: true, msg: "Video not Found", user: null });
        }

        // res.send({ done: true, doesStatsExists });
      }
    } catch (error: any) {
      res.status(500).send({ done: false, error });
    }
  }
};

export default stats;
