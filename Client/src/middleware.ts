import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { parsedEnv } from "@env/env";

type Unit = "ms" | "s" | "m" | "h" | "d";
type Duration = `${number} ${Unit}` | `${number}${Unit}`;

const token = parsedEnv.RATE_TOKENS;
const window = parsedEnv.RATE_WINDOW as Duration;

//Rate limit user: x requests Y time, afterwards user is blocked until Y time passes
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(token, window),
});

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
): Promise<Response | undefined> {
  const ip = request.ip ?? "anonymous";
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(
    ip
  );
  return success
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/blocked", request.url));
}

export const config = {
  matcher: "/",
};
