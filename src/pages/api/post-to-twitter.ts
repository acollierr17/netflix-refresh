import { type NextApiRequest, type NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/nextjs";
import { stripIndents } from "common-tags";
import he from "he";

import authenticateRequest from "../../server/authenticateRequest";
import type { NetflixJSONData, NetflixDeleteJSONData } from "../../utils/unogs";
import { fetchDailyTitles } from "../../utils/unogs";
import { getFriendlyFormattedDate } from "../../utils/date";
import { buildThread, createTweetThread } from "../../server/twitter";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const date = new Date();

    const titles = await fetchDailyTitles(date);
    if (!titles.size) {
      res.statusCode = 204;
      res.statusMessage = "No newly added or deleted content.";
      return res.end();
    }

    const tweetContent = buildThread({ date, titles });
    const thread = await createTweetThread(tweetContent);

    return res.json({
      metadata: {
        nonce: date.getTime(),
        size: titles.size,
      },
      data: {
        tweet_id: thread[0]?.data.id,
        added: titles.added,
        deleted: titles.deleted,
      },
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
    bodyParse: false,
  },
};
