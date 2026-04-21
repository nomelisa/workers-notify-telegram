# Cloudflare Workers Notify Telegram Bot

Simple worker to send messages via Telegram.

## Setup

1. Edit `worker.js` and replace:
   - `YOUR_BOT_TOKEN_HERE` with your Telegram bot token
   - `YOUR_CHAT_ID_HERE` with your chat ID

## Endpoints

### GET /
Send message via query param.

```
GET /?message=Hello%20World
```

### POST /
Send message via JSON body.

```bash
curl -X POST / -H "Content-Type: application/json" -d '{"message": "Hello World"}'
```

## Deploy

### Via Cloudflare Workers Web Editor
1. Go to https://workers.cloudflare.com
2. Create a new worker or select existing
3. Copy the content of `worker.js` into the editor
4. Click "Deploy"
