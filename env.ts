import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NOTION_SECRET: z.string(),
    NOTION_DB: z.string(),
    RESEND_API_KEY: z.string(),
    UPSTASH_REDIS_REST_URL: z.string(),
    UPSTASH_REDIS_REST_TOKEN: z.string(),
    AUTH_SECRET: z.string(),
    NEXTAUTH_SECRET: z.string(),
    AUTH_DISCORD_ID: z.string(),
    AUTH_DISCORD_SECRET: z.string(),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    VERCEL_URL: z.string().optional(),
    PORT: z.string().optional().default('3000'),
    NEXTAUTH_URL: z.string(),
    RENDER_INTERNAL_HOSTNAME: z.string().optional(),
    DATABASE_URL: z.string(),
  },
  client: {},
  runtimeEnv: {
    NOTION_SECRET: process.env.NOTION_SECRET,
    NOTION_DB: process.env.NOTION_DB,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
    AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    PORT: process.env.PORT,
    RENDER_INTERNAL_HOSTNAME: process.env.RENDER_INTERNAL_HOSTNAME,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
