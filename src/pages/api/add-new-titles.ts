import { type NextApiRequest, type NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/nextjs";

import authenticateRequest from "../../server/authenticateRequest";
import { fetchNewTitles } from "../../utils/netflix";
import { prisma } from "../../server/db/client";
import { parseTitles } from "../../utils/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const date = new Date();

    const titles = await fetchNewTitles(date);
    if (titles.length < 1) {
      res.statusCode = 204;
      res.statusMessage = "No newly added content.";
      return res.end();
    }

    const created = await prisma.title.createMany({
      data: parseTitles(titles),
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
        size: titles.length,
        added: created.count,
      },
      data: titles,
    });
  } catch (e: any) {
    return res.status(500).json({
      code: res.statusCode,
      name: e.name,
      message: e.message,
    });
  }
}

export default verifySignature(authenticateRequest(handler));

export const config = {
  api: {
    bodyParser: false,
  },
};
