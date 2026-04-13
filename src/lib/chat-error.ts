import { extractOpenRouterDetail } from "@/lib/extract-openrouter-detail";

/** Client-side errors often omit `responseBody`; OpenRouter still exposes 429 on the error object / data. */
function indicatesRateLimited429(err: unknown, depth = 0): boolean {
  if (depth > 10 || err == null || typeof err !== "object") return false;
  const e = err as Record<string, unknown>;
  if (e.statusCode === 429) return true;
  const data = e.data;
  if (data && typeof data === "object") {
    const code = (data as { error?: { code?: unknown } }).error?.code;
    if (code === 429) return true;
  }
  for (const key of ["cause", "lastError", "errors"] as const) {
    const sub = e[key];
    if (Array.isArray(sub)) {
      for (const item of sub) {
        if (indicatesRateLimited429(item, depth + 1)) return true;
      }
    } else if (indicatesRateLimited429(sub, depth + 1)) return true;
  }
  return false;
}

const RATE_LIMIT_GUIDANCE =
  "This free model is temporarily rate-limited on the provider’s side. Wait a minute and try again, set OPENROUTER_MODEL in .env.local to another model id from openrouter.ai/models, or add your Google AI key under OpenRouter → Integrations for higher limits (openrouter.ai/settings/integrations).";

/** Turn provider / transport errors into user-facing copy (no secrets). */
export function humanizeChatError(error: Error): string {
  if (indicatesRateLimited429(error)) {
    return RATE_LIMIT_GUIDANCE;
  }

  const detail = extractOpenRouterDetail(error);
  if (detail) {
    const d = detail.toLowerCase();
    if (d.includes("rate-limited") || d.includes("rate limited") || d.includes("temporarily rate")) {
      return RATE_LIMIT_GUIDANCE;
    }
    if (d.includes("no endpoints found")) {
      return "OpenRouter has no provider for that model id (wrong name, retired, or unavailable). Remove OPENROUTER_MODEL to use the app default, or copy an exact id from openrouter.ai/models.";
    }
    if (d.includes("developer instruction is not enabled")) {
      return "This model does not allow a separate system/instruction field. The app sends instructions inside the chat instead; if you still see this, try another model.";
    }
    if (detail.length <= 280) return detail;
    return `${detail.slice(0, 277)}…`;
  }

  const raw = `${error.name} ${error.message}`.toLowerCase();

  if (raw.includes("failed after") && raw.includes("attempt") && raw.includes("provider returned error")) {
    return "The AI provider could not finish after several attempts (often rate limits on free models). Wait a bit and try again, or change OPENROUTER_MODEL in .env.local.";
  }

  if (raw.includes("openrouter") && (raw.includes("api") || raw.includes("key") || raw.includes("401"))) {
    return "OpenRouter key problem: set OPENROUTER_API_KEY in .env.local (openrouter.ai/keys), save, and restart the dev server.";
  }

  if (raw.includes("google_generative_ai_api_key") || raw.includes("goog-api-key") || raw.includes("api key is missing")) {
    return "Google AI key missing: set GOOGLE_GENERATIVE_AI_API_KEY in .env.local (Google AI Studio), save, and restart the dev server.";
  }

  if (raw.includes("resource_exhausted") || (raw.includes("billing") && raw.includes("google"))) {
    return "Google AI reported a quota or billing limit. Check usage and billing in Google Cloud / AI Studio for this API key, then try again.";
  }

  if (raw.includes("insufficient_quota") || raw.includes("exceeded your current quota")) {
    return "The AI couldn’t reply: your API account has no usable quota left. For Google (Gemini), check AI Studio / Cloud billing and quotas; for OpenAI, check platform.openai.com → Billing. Then try again.";
  }

  if (raw.includes("rate_limit") || raw.includes("429")) {
    return "Too many requests right now. Wait a moment and try again—or switch OPENROUTER_MODEL if the free tier is busy.";
  }

  if (raw.includes("invalid_api_key") || raw.includes("incorrect api key")) {
    return "API key problem: check GOOGLE_GENERATIVE_AI_API_KEY (or OPENAI_API_KEY if you use OpenAI) in .env.local and restart the dev server.";
  }

  if (raw.includes("no endpoints found")) {
    return "OpenRouter has no provider for that model id. Fix OPENROUTER_MODEL in .env.local (exact id from openrouter.ai/models) or remove it to use the default.";
  }

  if (raw.includes("model") && raw.includes("not found")) {
    return "That model isn’t available for your key. Set OPENROUTER_MODEL in .env.local to a valid id, or check the chat API route.";
  }

  if (raw.includes("invalid responses api request")) {
    return "The AI service couldn’t accept this request. Try again in a moment; if it keeps happening, check OpenRouter status and your API key.";
  }

  if (raw.includes("provider returned error")) {
    return "OpenRouter reported a provider error (often rate limits or outages on free models). Wait a bit and try again, set OPENROUTER_MODEL in .env.local to another model, or check the server log for the exact upstream message.";
  }

  if (raw.includes("developer instruction is not enabled")) {
    return "This model does not allow a separate system/instruction field. The app should send instructions inside the chat instead; if you still see this, report it.";
  }

  const short = error.message?.trim();
  if (short && short.length < 280) return short;
  return "Something went wrong reaching the AI. Check your connection, API key, and provider account limits, then try again.";
}
