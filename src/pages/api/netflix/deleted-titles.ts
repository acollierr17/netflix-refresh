import { type NextApiRequest, type NextApiResponse } from "next";

import { fetchDeletedTitles } from "../../../utils/netflix";
import { convertUTCStringToDate, getFormattedDate } from "../../../utils/date";
import authenticateRequest from "../../../server/authenticateRequest";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const date = new Date();
    const queryDate = req.query.date
      ? convertUTCStringToDate(req.query.date as string)
      : new Date();
    if (!queryDate)
      return res.status(400).json({
        metadata: {
          nonce: date.getTime(),
        },
        message: `The 'date' query parameter is not in the proper format! (ex. ${getFormattedDate(
          date
        )})`,
      });

    const formattedQueryDate = getFormattedDate(queryDate);
    const titles = await fetchDeletedTitles(queryDate);
    if (titles.length < 1) {
      res.statusCode = 204;
      res.statusMessage =
        "There are no new deleted titles for the provided date.";
      return res.end();
    }

    return res.json({
      metadata: {
        nonce: date.getTime(),
        query_date: formattedQueryDate,
        size: titles.length,
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

export default authenticateRequest(handler);
