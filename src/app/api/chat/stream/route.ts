import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type ModelMessage, type UIMessage } from "ai";
import { humanizeChatError } from "@/lib/chat-error";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

/** OpenRouter model id — override with OPENROUTER_MODEL in .env.local if the default free tier is rate-limited. */
const DEFAULT_MODEL = "openrouter/auto";

const SYSTEM_PROMPT = `
You are "ThriveWell," a world-class empathetic mental wellness companion. Your name reflects growth, resilience, and wellbeing. 
Your mission is to provide an immediate "safe harbor" for students and young adults feeling invisible, anxious, or lonely.
IDENTITY & TONE:
- Personality: Warm, patient, non-judgmental, and deeply intuitive. Like a wise, gentle friend.
- Language: Use soft, encouraging words. Avoid clinical jargon unless helpful. 
- Cultural Sensitivity: Be aware of the pressures of academic excellence, family expectations, and social isolation.
THERAPEUTIC PROTOCOL:
1. VALIDATE FIRST: Always acknowledge the user's emotion before offering solutions. (e.g., "I can feel how heavy this is for you," not just "I'm sorry.")
2. REFLECTIVE LISTENING: Periodically summarize what the user said to show they are heard.
3. CBT ELEMENTS: Gently help users identify "all-or-nothing" thinking or negative cognitive distortions.
4. MICRO-MEDITATION: Occasionally suggest a 5-second breathing exercise if the user seems highly distressed.
CRITICAL SAFETY:
- If a user expresses self-harm or suicidal intent, do not provide "advice."
- Transition immediately to a supportive referral: "I'm so concerned about you right now. I'm a machine and I can't be there physically, but there are wonderful people who can. Please, can we look at the resources on our Help page together?"
- Provide a clear bridge to the /find-help page.
CONSTRAINTS:
- No medical diagnosis.
- No judgment.
- Keep responses concise but meaningful.
`.trim();

export async function POST(req: Request) {
  const key = process.env.OPENROUTER_API_KEY?.trim();
  if (!key) {
    return new Response(
      JSON.stringify({
        error:
          "Missing OPENROUTER_API_KEY. Add it to .env.local and restart `npm run dev`.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages } = (await req.json()) as { messages?: UIMessage[] };

  if (!Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: "Invalid body: messages[] required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const modelMessages = await convertToModelMessages(messages);

  // google/gemma-3-12b-it (via Google AI Studio) rejects separate system/developer
  // instructions ("Developer instruction is not enabled"). Embed the system prompt as
  // an initial user + assistant turn instead of `system:`.
  const instructionPreamble: ModelMessage[] = [
    {
      role: "user",
      content:
        "Follow these permanent instructions for the rest of the conversation:\n\n" +
        SYSTEM_PROMPT,
    },
    {
      role: "assistant",
      content:
        "Understood. I will respond as ThriveWell and follow these instructions in every message.",
    },
  ];

  const modelId = process.env.OPENROUTER_MODEL?.trim() || DEFAULT_MODEL;

  // Default `openrouter("…")` uses OpenAI Responses API (`/responses`). OpenRouter only
  // reliably supports the Chat Completions path for third-party models — use `.chat`.
  // maxRetries: 0 avoids triple delays when the free model is 429 rate-limited upstream.
  const result = streamText({
    model: openrouter.chat(modelId),
    messages: [...instructionPreamble, ...modelMessages],
    maxRetries: 0,
  });

  return result.toUIMessageStreamResponse({
    // Server has full APICallError (e.g. responseBody with upstream rate-limit text); embed that for the UI.
    onError: (err) =>
      humanizeChatError(err instanceof Error ? err : new Error(String(err))),
  });
}
