import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        NODE_ENV: z.enum(["development", "test", "production"]),
        RAPIDAPI_KEY: z.string().min(1),
        RAPIDAPI_HOST: z.string().min(1),
        TWITTER_CONSUMER_KEY: z.string().min(1),
        TWITTER_CONSUMER_SECRET: z.string().min(1),
        TWITTER_ACCESS_TOKEN: z.string().min(1),
        TWITTER_ACCESS_TOKEN_SECRET: z.string().min(1),
        TWITTER_BEARER_TOKEN: z.string().min(1),
        QSTASH_URL: z.string().min(1),
        QSTASH_TOKEN: z.string().min(1),
        QSTASH_CURRENT_SIGNING_KEY: z.string().min(1),
        QSTASH_NEXT_SIGNING_KEY: z.string().min(1),
        API_TOKEN: z.string().min(1),
        UPSTASH_REDIS_REST_URL: z.string().min(1),
        UPSTASH_REDIS_REST_TOKEN: z.string().min(1)
    },
    client: {
        NEXT_PUBLIC_FATHOM_SITE_ID: z.string().min(1),
        NEXT_PUBLIC_ENABLE_ANALYTICS: z.enum(["true", "false"])
    },
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
        RAPIDAPI_HOST: process.env.RAPIDAPI_HOST,
        TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
        TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
        TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
        TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN,
        QSTASH_URL: process.env.QSTASH_URL,
        QSTASH_TOKEN: process.env.QSTASH_TOKEN,
        QSTASH_CURRENT_SIGNING_KEY: process.env.QSTASH_CURRENT_SIGNING_KEY,
        QSTASH_NEXT_SIGNING_KEY: process.env.QSTASH_NEXT_SIGNING_KEY,
        API_TOKEN: process.env.API_TOKEN,
        UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
        UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
        NEXT_PUBLIC_FATHOM_SITE_ID: process.env.NEXT_PUBLIC_FATHOM_SITE_ID,
        NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS
    },
});