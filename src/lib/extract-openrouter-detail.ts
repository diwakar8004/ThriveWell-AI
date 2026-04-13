/**
 * OpenRouter errors often include a JSON body:
 * - `error.metadata.raw` — upstream provider text (e.g. rate limits)
 * - `error.message` — OpenRouter messages (e.g. "No endpoints found for …")
 */
export function extractOpenRouterDetail(error: unknown): string | null {
  for (const body of collectResponseBodies(error)) {
    const text = parseOpenRouterResponseBody(body);
    if (text) return text;
  }
  const fromData = collectNestedDataErrorMessages(error);
  if (fromData) return fromData;
  return null;
}

function collectResponseBodies(err: unknown, depth = 0): string[] {
  if (depth > 8 || err == null) return [];
  if (typeof err !== "object") return [];

  const e = err as Record<string, unknown>;
  const out: string[] = [];

  if (typeof e.responseBody === "string") out.push(e.responseBody);

  if (Array.isArray(e.errors)) {
    for (const sub of e.errors) out.push(...collectResponseBodies(sub, depth + 1));
  }
  for (const key of ["lastError", "cause"] as const) {
    if (key in e) out.push(...collectResponseBodies(e[key], depth + 1));
  }
  return out;
}

/** Walk AI SDK APICallError.data?.error?.message when responseBody is missing (e.g. some clients). */
function collectNestedDataErrorMessages(err: unknown, depth = 0): string | null {
  if (depth > 8 || err == null || typeof err !== "object") return null;
  const e = err as Record<string, unknown>;

  const data = e.data;
  if (data && typeof data === "object") {
    const msg = (data as { error?: { message?: string } }).error?.message;
    if (typeof msg === "string" && msg.trim()) return msg.trim();
  }

  if (Array.isArray(e.errors)) {
    for (const sub of e.errors) {
      const m = collectNestedDataErrorMessages(sub, depth + 1);
      if (m) return m;
    }
  }
  for (const key of ["lastError", "cause"] as const) {
    if (key in e) {
      const m = collectNestedDataErrorMessages(e[key], depth + 1);
      if (m) return m;
    }
  }
  return null;
}

function parseOpenRouterResponseBody(responseBody: string): string | null {
  try {
    const parsed = JSON.parse(responseBody) as {
      error?: { metadata?: { raw?: string }; message?: string };
    };
    const inner = parsed.error;
    if (!inner) return null;
    const raw = inner.metadata?.raw;
    if (typeof raw === "string" && raw.trim()) return raw.trim();
    const msg = inner.message;
    if (typeof msg === "string" && msg.trim()) return msg.trim();
  } catch {
    return null;
  }
  return null;
}
