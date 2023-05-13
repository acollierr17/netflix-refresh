import { type NextApiRequest, type NextApiResponse } from "next";
import { Redis } from "@upstash/redis";
import { verifySignature } from "@upstash/qstash/nextjs";

import { env } from "../../../env/server.mjs";

import { prisma } from "../../../server/db/client";
import { fetchNewTitles } from "../../../utils/unogs";
import { parseTitleInputData } from "../../../utils/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const date = new Date();

  try {
    if (
      !req.query.apiKey ||
      req.query.apiKey !== env.API_TOKEN
    ) {
      res.statusCode = 401;
      res.statusMessage = "The API key is invalid or not found!";
      return res.end();
    }

    const titles = await fetchNewTitles(date);
    if (titles.length < 1) {
      res.statusCode = 204;
      res.statusMessage = "There are no new titles.";
      return res.end();
    }

    const created = await prisma.title.createMany({
      data: titles.map(parseTitleInputData),
      skipDuplicates: true,
    });

    if (created.count < 1) {
      res.statusCode = 204;
      res.statusMessage = "There are no new titles to update in the database.";
      return res.end();
    }

    return res.json({
      metadata: {
        nonce: date.getTime(),
        size: created.count,
      },
      data: [],
    });
  } catch (e: any) {
    return res.status(500).json({
      code: res.statusCode,
      name: e.name,
      message: e.message,
    });
  }
}

export default verifySignature(handler)

export const config = {
  api: {
    bodyParser: false,
  },
};