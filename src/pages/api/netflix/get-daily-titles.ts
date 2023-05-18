import { type NextApiRequest, type NextApiResponse } from "next";

import { fetchDailyTitles } from "../../../utils/netflix";
import { convertDateQueryParam, getFormattedDate } from "../../../utils/date";
import authenticateRequest from "../../../server/authenticateRequest";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const date = new Date();
    const queryDate = convertDateQueryParam(req.query.date, date);
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
    const titles = await fetchDailyTitles({ date: queryDate });
    if (!titles.size) {
      res.statusCode = 204;
      res.statusMessage = "No newly added or deleted content.";
      return res.end();
    }

    return res.json({
      metadata: {
        nonce: date.getTime(),
        query_date: formattedQueryDate,
        size: titles.size,
      },
      data: {
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

export default authenticateRequest(handler);
