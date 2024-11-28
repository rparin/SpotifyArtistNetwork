import { ZodSchema } from "zod";
import { fromError } from "zod-validation-error";

export type FetchWithErrorHandlingType = {
  fetchUrl: string | URL | Request;
  method: "GET" | "POST";
  headers?: HeadersInit | undefined;
  body?: BodyInit | null | undefined;
  fetchErrorStr: string;
  resErrorStr: string;
  zodErrorStr: string;
  zodSchema: ZodSchema;
};

export async function fetchWithErrorHandling(
  config: FetchWithErrorHandlingType
) {
  let res;

  try {
    res = await fetch(config.fetchUrl, {
      method: config.method,
      headers: config.headers,
      body: config.body,
      cache: "no-store",
    });
  } catch (error) {
    throw new Error(config.fetchErrorStr, { cause: error });
  }

  if (!res?.ok) {
    throw new Error(config.resErrorStr, {
      cause: `HTTP Response Code: ${res?.status}`,
    });
  }

  const data = await res.json();
  const result = config.zodSchema.safeParse(data);
  if (!result.success) {
    throw new Error(config.zodErrorStr, {
      cause: fromError(result.error).toString(),
    });
  } else {
    return result.data;
  }
}
