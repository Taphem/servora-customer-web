/**
 * The backend error envelope, shared by every Servora service behind the
 * API Gateway: `{ error: { code, message, requestId? } }`.
 */
export interface ApiErrorPayload {
  code: string;
  message: string;
  requestId?: string;
}

/**
 * Synthetic codes for failures that never reach a backend error envelope
 * (the request itself failed, or the response body wasn't the shape we
 * expected) — kept visually distinct from real backend error codes so
 * callers can tell "the server said no" apart from "we couldn't even ask".
 */
export const ClientErrorCode = {
  NETWORK_ERROR: "CLIENT_NETWORK_ERROR",
  MALFORMED_RESPONSE: "CLIENT_MALFORMED_RESPONSE",
  TIMEOUT: "CLIENT_TIMEOUT",
} as const;

export type ClientErrorCode =
  (typeof ClientErrorCode)[keyof typeof ClientErrorCode];

export class ApiError extends Error {
  readonly code: string;
  readonly status: number | null;
  readonly requestId?: string;

  constructor(
    message: string,
    options: { code: string; status: number | null; requestId?: string },
  ) {
    super(message);
    this.name = "ApiError";
    this.code = options.code;
    this.status = options.status;
    this.requestId = options.requestId;
  }
}
