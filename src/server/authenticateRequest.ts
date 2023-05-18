import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { env } from "../env/server.mjs";

export default function authenticateRequest(
  handler: NextApiHandler
): NextApiHandler {
  const date = new Date();
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (
      !req.headers["x-api-key"] ||
      req.headers["x-api-key"] !== env.API_TOKEN
    ) {
      return res.status(401).json({
        metadata: { nonce: date.getTime() },
        error: "The API key is invalid or not found.",
      });
    }

    return handler(req, res);
  };
}
