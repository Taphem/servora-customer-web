import { env } from "@/lib/env";
import { ApiError, ClientErrorCode, type ApiErrorPayload } from "./types";

export interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  /** Aborts the request after this many milliseconds. Defaults to 10s. */
  timeoutMs?: number;
}

/**
 * The single fetch wrapper every future domain module (`lib/api/*.ts`)
 * should build on — no component should call `fetch()` directly. Always
 * targets the API Gateway (`env.apiBaseUrl`) with `credentials: "include"`
 * so a session cookie rides along automatically once real auth exists.
 *
 * No domain endpoints are wired up yet: this file is intentionally just
 * the transport + error-handling foundation, ready for a feature to add
 * its own typed functions on top (e.g. `lib/api/services.ts`) once a real
 * backend contract exists to call.
 */
export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { body, timeoutMs = 10_000, headers, ...rest } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;
  try {
    response = await fetch(`${env.apiBaseUrl}${path}`, {
      ...rest,
      credentials: "include",
      signal: controller.signal,
      headers: {
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (cause) {
    const isAbort = cause instanceof DOMException && cause.name === "AbortError";
    throw new ApiError(
      isAbort ? "The request timed out." : "Couldn't reach the server.",
      { code: isAbort ? ClientErrorCode.TIMEOUT : ClientErrorCode.NETWORK_ERROR, status: null },
    );
  } finally {
    clearTimeout(timeout);
  }

  const text = await response.text();
  const data: unknown = text.length > 0 ? safeJsonParse(text) : undefined;

  if (!response.ok) {
    const payload = isApiErrorPayload(data) ? data.error : undefined;
    throw new ApiError(payload?.message ?? "Something went wrong.", {
      code: payload?.code ?? ClientErrorCode.MALFORMED_RESPONSE,
      status: response.status,
      requestId: payload?.requestId,
    });
  }

  return data as T;
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

function isApiErrorPayload(
  value: unknown,
): value is { error: ApiErrorPayload } {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof (value as { error?: unknown }).error === "object"
  );
}
