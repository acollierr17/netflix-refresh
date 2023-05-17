import { TwitterApi } from "twitter-api-v2";
import { env } from "../env/server.mjs";
import type {
  DailyNetflixJSON,
  NetflixDeleteJSONData,
  NetflixJSONData,
} from "../utils/unogs";
import he from "he";
import { stripIndents } from "common-tags";
import { getFriendlyFormattedDate } from "../utils/date";

const client = new TwitterApi({
  appKey: env.TWITTER_CONSUMER_KEY,
  appSecret: env.TWITTER_CONSUMER_SECRET,
  accessToken: env.TWITTER_ACCESS_TOKEN,
  accessSecret: env.TWITTER_ACCESS_TOKEN_SECRET,
});

export const createTweetThread = async (tweets: string[]) => {
  return client.v2.tweetThread(tweets);
};

export const buildThread = ({
  date,
  titles,
}: {
  date: Date;
  titles: DailyNetflixJSON;
}): string[] => {
  const displayTitle = (title: NetflixJSONData | NetflixDeleteJSONData) => {
    const titleType = {
      series: "Series",
      movie: "Movie",
    };

    let str = "• ";
    if ("year" in title)
      str += `${he.decode(title.title)} (${title.year}) [${
        titleType[title.title_type]
      }]`;
    else str += he.decode(title.title);

    return str;
  };

  const tweetContent: string[] = [
    stripIndents`
      Netflix Refresh (US) • ${getFriendlyFormattedDate(date)}

      Added: ${titles.added.length}
      Deleted: ${titles.deleted.length}
    `,
  ];

  if (titles.added.length > 0)
    tweetContent.push(stripIndents`
      Added Content:
      
      ${titles.added.map(displayTitle).join("\n")}
    `);

  if (titles.deleted.length > 0)
    tweetContent.push(stripIndents`
      Deleted Content:
      
      ${titles.deleted.map(displayTitle).join("\n")}
    `);

  return tweetContent;
};
