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
  "This free model is temporarily rate-limited on the provider’s side. Wait a minute and try again, or check your Google API quota and retry later.";

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
      return "The selected model is unavailable for your key. Check the model ID or remove any explicit model override.";
    }
    if (d.includes("developer instruction is not enabled")) {
      return "This model does not allow a separate system/instruction field. The app sends instructions inside the chat instead; if you still see this, try another model.";
    }
    if (detail.length <= 280) return detail;
    return `${detail.slice(0, 277)}…`;
  }

  const raw = `${error.name} ${error.message}`.toLowerCase();

  if (raw.includes("failed after") && raw.includes("attempt") && raw.includes("provider returned error")) {
    return "The AI provider could not finish after several attempts (often rate limits on free models). Wait a bit and try again, or check your API quota.";
  }

  if (raw.includes("openrouter") && (raw.includes("api") || raw.includes("key") || raw.includes("401"))) {
    return "OpenRouter key problem: set OPENROUTER_API_KEY in .env.local (openrouter.ai/keys), save, and restart the dev server.";
  }

  if (raw.includes("huggingface_api_key") || raw.includes("api key is missing") || raw.includes("huggingface_api_key")) {
    return "Hugging Face key missing: set HUGGINGFACE_API_KEY in .env.local (Hugging Face), save, and restart the dev server.";
  }

  if (raw.includes("resource_exhausted") || (raw.includes("billing") && raw.includes("huggingface"))) {
    return "Hugging Face reported a quota or billing limit. Check usage and billing on Hugging Face for this API key, then try again.";
  }

  if (raw.includes("insufficient_quota") || raw.includes("exceeded your current quota")) {
    return "The AI couldn’t reply: your API account has no usable quota left. For Hugging Face, check billing and quotas on Hugging Face; for OpenAI, check platform.openai.com → Billing. Then try again.";
  }

  if (raw.includes("rate_limit") || raw.includes("429")) {
    return "Too many requests right now. Wait a moment and try again.";
  }

  if (raw.includes("invalid_api_key") || raw.includes("incorrect api key")) {
    return "API key problem: check HUGGINGFACE_API_KEY (or OPENAI_API_KEY if you use OpenAI) in .env.local and restart the dev server.";
  }

  if (raw.includes("no endpoints found")) {
    return "No provider was found for that model. Check your configured model or API provider settings, then restart the dev server.";
  }

  if (raw.includes("model") && raw.includes("not found")) {
    return "That model isn’t available for your key. Check your configured model or API provider, and restart the dev server.";
  }

  if (raw.includes("invalid responses api request")) {
    return "The AI service couldn’t accept this request. Try again in a moment; if it keeps happening, check your API provider status and key.";
  }

  if (raw.includes("provider returned error")) {
    return "The AI provider reported an error (often rate limits or temporary issues). Wait a bit and try again, or check the server log for details.";
  }

  if (raw.includes("developer instruction is not enabled")) {
    return "This model does not allow a separate system/instruction field. The app should send instructions inside the chat instead; if you still see this, report it.";
  }

  const short = error.message?.trim();
  if (short && short.length < 280) return short;
  return "Something went wrong reaching the AI. Check your connection, API key, and provider account limits, then try again.";
}
