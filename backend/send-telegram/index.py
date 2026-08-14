import json
import urllib.request

TELEGRAM_BOT_TOKEN = "8992719432:AAF6UMeuZ_KEHJOLU0tvYr9xtKJTMlxVe58"
TELEGRAM_CHAT_ID = "1051652690"


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта в Telegram"""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    raw_body = event.get("body") or "{}"
    if isinstance(raw_body, dict):
        body = raw_body
    elif isinstance(raw_body, str):
        parsed = json.loads(raw_body)
        body = parsed if isinstance(parsed, dict) else {}
    else:
        body = {}
    name = str(body.get("name") or "").strip()
    phone = str(body.get("phone") or "").strip()
    extra = str(body.get("extra") or "")

    text = f"Новая заявка с сайта:\nИмя: {name}\nТелефон: {phone}"
    if extra:
        text += f"\n{extra}"

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = json.dumps({"chat_id": TELEGRAM_CHAT_ID, "text": text}).encode()
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"}, method="POST")

    result = {"ok": False}
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=8) as resp:
                result = json.loads(resp.read())
            break
        except urllib.error.HTTPError as e:
            detail = e.read().decode()
            print(f"Telegram HTTP error: {detail}")
            break
        except Exception as e:
            print(f"Telegram attempt {attempt + 1} failed: {e}")

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": {"ok": result.get("ok", False)},
    }