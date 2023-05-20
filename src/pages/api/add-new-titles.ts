import { type NextApiRequest, type NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/nextjs";
import { ulid } from "ulid";

import authenticateRequest from "@/server/authenticateRequest";
import { fetchNewTitles } from "@/utils/netflix";
import { prisma } from "@/server/db/client";
import { parseTitles } from "@/utils/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const date = new Date();

    const titles = await fetchNewTitles({
      date,
      force: true,
      fetchAllCountries: true,
    });
    if (titles.length < 1) {
      res.statusCode = 204;
      res.statusMessage = "No newly added content.";
      return res.end();
    }

    const data = parseTitles(titles).map((title) => ({ ...title, id: ulid() }));
    const created = await prisma.title.createMany({
      data: data,
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
