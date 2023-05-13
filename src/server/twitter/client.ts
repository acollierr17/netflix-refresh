import { Client } from "twitter-api-sdk";
import { env } from "../../env/server.mjs";

const client = new Client(env.TWITTER_BEARER_TOKEN);

export default client;
