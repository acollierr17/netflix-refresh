import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import { fetchNewTitles } from "../../../utils/unogs";
import { prisma } from "../../../server/db/client";
import type { NetflixJSONData } from "../../../utils/db";
import { formatJSONData, parseTitleInputData } from "../../../utils/db";
import { env } from "../../../env/server.mjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const date = new Date();
  try {
    if (
      !req.headers.authorization ||
      req.headers.authorization !== env.API_TOKEN
    ) {
      res.statusCode = 401;
      res.statusMessage = "The API key is invalid or not found!";
      return res.end();
    }

    const titlesFromFile = (
      JSON.parse(await fs.readFile("items.json", "utf-8")) as NetflixJSONData[]
    ).map(formatJSONData);

    const checkMissingTitles = async () => {
      const netflixIds = titlesFromFile.map(({ netflixId }) => netflixId);

      const result = await prisma.title.findMany({
        where: {
          netflixId: {
            in: netflixIds,
          },
        },
      });

      return titlesFromFile.filter(
        (title) =>
          !result.some((record) => record.netflixId === title.netflixId)
      );
    };

    const titles = await checkMissingTitles();

    if (!titles.length)
      return res.json({
        metadata: {
          nonce: date.getTime(),
        },
        message: "There are no results to update in the database.",
      });

    await prisma.title.createMany({
      data: titles.map(parseTitleInputData),
      skipDuplicates: true,
    });

    return res.json({
      metadata: {
        nonce: date.getTime(),
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
