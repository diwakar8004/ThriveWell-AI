import type { UIMessage } from "ai";

/** Flatten UI message parts to a single string for display / crisis checks. */
export function textFromUIMessage(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("");
}
