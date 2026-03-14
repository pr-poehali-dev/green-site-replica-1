const TELEGRAM_URL = "https://functions.poehali.dev/7b363108-9d55-4261-8b18-153e6d4e6b40";

export async function sendTelegram(name: string, phone: string, extra?: string): Promise<void> {
  await fetch(TELEGRAM_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, extra: extra || "" }),
  });
}
