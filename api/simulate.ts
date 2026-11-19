import { GoogleGenAI } from '@google/genai';

const ALLOWED_HOSTS = ['the-marketingverse.com', 'www.the-marketingverse.com'];

const rateLimitStore = new Map<string, { minuteCount: number; hourCount: number; minuteTs: number; hourTs: number }>();

const RATE_PER_MINUTE = 6;
const RATE_PER_HOUR = 40;
const MAX_INPUT_LENGTH = 500;
const MAX_PROMPT_LENGTH = 1000;

function checkOrigin(req: Request): boolean {
  const origin = req.headers.get('origin') || '';
  const referer = req.headers.get('referer') || '';

  const isVercelPreview = origin.includes('vercel.app') || referer.includes('vercel.app');
  const isAllowedHost = ALLOWED_HOSTS.some(h => origin.includes(h) || referer.includes(h));
  const isLocalDev = origin.includes('localhost') || origin.includes('127.0.0.1');

  return isAllowedHost || isVercelPreview || isLocalDev;
}

function checkRateLimit(ip: string): { allowed: boolean } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip) || { minuteCount: 0, hourCount: 0, minuteTs: now, hourTs: now };

  if (now - entry.minuteTs > 60_000) { entry.minuteCount = 0; entry.minuteTs = now; }
  if (now - entry.hourTs > 3_600_000) { entry.hourCount = 0; entry.hourTs = now; }

  if (entry.minuteCount >= RATE_PER_MINUTE || entry.hourCount >= RATE_PER_HOUR) {
    return { allowed: false };
  }

  entry.minuteCount++;
  entry.hourCount++;
  rateLimitStore.set(ip, entry);
  return { allowed: true };
}

function getIP(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  if (!checkOrigin(req)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const ip = getIP(req);
  if (!checkRateLimit(ip).allowed) {
    return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const { prompt, input } = await req.json();

    if (!input || typeof input !== 'string' || input.trim().length === 0) {
      return Response.json({ error: 'Invalid request.' }, { status: 400 });
    }

    if (input.length > MAX_INPUT_LENGTH) {
      return Response.json({ error: 'Input too long.' }, { status: 400 });
    }

    if (typeof prompt === 'string' && prompt.length > MAX_PROMPT_LENGTH) {
      return Response.json({ error: 'Invalid request.' }, { status: 400 });
    }

    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      return Response.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${prompt}\n\nUser Input: ${input}`,
      config: { temperature: 0.7, maxOutputTokens: 512 },
    });

    return Response.json({ text: response.text });
  } catch (err: any) {
    console.error('Simulate error:', err);
    return Response.json({ error: 'Service error. Please try again later.' }, { status: 500 });
  }
}

export const config = { runtime: 'edge' };
