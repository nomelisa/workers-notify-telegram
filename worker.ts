const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';

export interface Env {}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;

		if (path === '/send' && request.method === 'GET') {
			const message = url.searchParams.get('message');
			if (!message) {
				return new Response('Missing message param', { status: 400 });
			}
			return sendTelegramMessage(message);
		}

		if (path === '/send' && request.method === 'POST') {
			try {
				const body = await request.json() as { message: string };
				if (!body.message) {
					return new Response('Missing message in body', { status: 400 });
				}
				return sendTelegramMessage(body.message);
			} catch {
				return new Response('Invalid JSON body', { status: 400 });
			}
		}

		return new Response('Not found', { status: 404 });
	},
};

async function sendTelegramMessage(text: string): Promise<Response> {
	const encodedText = encodeURIComponent(text);
	const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodedText}&parse_mode=Markdown`;

	const response = await fetch(url, { method: 'POST' });

	if (!response.ok) {
		const error = await response.text();
		return new Response(`Telegram error: ${error}`, { status: 500 });
	}

	return new Response('Message sent', { status: 200 });
}
