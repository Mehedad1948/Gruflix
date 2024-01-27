// env.d.ts

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
      APPLE_ID: string;
      JWT_SECRET: string;
      YOUTUBE_BASE_URL: string;
      MAILING_SERVOCE_CLIENT_ID: string;
      MAILING_SERVOCE_CLIENT_SECRET: string;
    }
  }
}

import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}
