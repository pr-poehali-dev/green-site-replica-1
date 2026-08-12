const TELEGRAM_URL = "https://functions.poehali.dev/7b363108-9d55-4261-8b18-153e6d4e6b40";

export async function sendTelegram(
  name: string,
  phone: string,
  location?: string,
  extra?: string
): Promise<void> {
  let extraText = "";

  if (location && location.trim()) {
    extraText += `📍 Объект: ${location.trim()}`;
  }

  if (extra && extra.trim()) {
    extraText += (extraText ? "\n" : "") + extra.trim();
  }

  await fetch(TELEGRAM_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, extra: extraText }),
  });
}