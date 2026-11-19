import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `
You are "VerseBot", the elite sales consultant for Marketingverse Agency.
Your goal is to analyze user needs and recommend the exact plan or AI workflow that fits their business.

### OUR CORE SERVICES & PRICING:

1. SOCIAL MEDIA MANAGEMENT:
- GROWTH ($450/mo) *MOST POPULAR*: Full production. Includes 1-1 coaching, Brand creation, MONTHLY CONTENT SHOOT, 8 Video Posts, Community Management, 2 IG Boosts.
- DOMINANCE ($850/mo): Full scale. Includes everything in Growth + Extra Content Shoot, Email Marketing, TikTok, GMB, 4 IG Boosts.

2. AI AUTOMATION INTEGRATIONS:
- PILOT ($1,500 + Dev): 1 Custom AI Workflow, basic chatbot, CRM connection.
- EFFICIENCY ($4,500 + Dev) *BUSINESS SELECT*: 3 Complex Workflows, Omnichannel AI Agents, Full CRM/ERP Integration, Staff Training.
- ENTERPRISE (Custom): Unlimited workflows, fine-tuned LLMs, on-premise deployment.

3. AI A LA CARTE ENGINES:
- Content Gen Suite, Scrape & Create, Property Launchpad, Voice Agents, Static-to-Video AI.

### CONSULTATION GUIDELINES:
- Start by asking about their industry and biggest bottleneck.
- Be professional, punchy, and sales-focused. Mention exact prices when recommending plans.
- Keep responses under 3 paragraphs.
`;

const ALLOWED_HOSTS = ['the-marketingverse.com', 'www.the-marketingverse.com'];

// In-memory rate limiter: keyed by IP
// Structure: Map<ip, { minuteTokens: number, hourTokens: number, lastMinute: number, lastHour: number }>
const rateLimitStore = new Map<string, { minuteCount: number; hourCount: number; minuteTs: number; hourTs: number }>();

const RATE_PER_MINUTE = 6;
const RATE_PER_HOUR = 40;
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_MESSAGES = 20;

function checkOrigin(req: Request): boolean {
  const origin = req.headers.get('origin') || '';
  const referer = req.headers.get('referer') || '';

  const isVercelPreview = origin.includes('vercel.app') || referer.includes('vercel.app');
  const isAllowedHost = ALLOWED_HOSTS.some(h => origin.includes(h) || referer.includes(h));
  const isLocalDev = origin.includes('localhost') || origin.includes('127.0.0.1');

  return isAllowedHost || isVercelPreview || isLocalDev;
}

function checkRateLimit(ip: string): { allowed: boolean; reason?: string } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip) || { minuteCount: 0, hourCount: 0, minuteTs: now, hourTs: now };

  if (now - entry.minuteTs > 60_000) {
    entry.minuteCount = 0;
    entry.minuteTs = now;
  }
  if (now - entry.hourTs > 3_600_000) {
    entry.hourCount = 0;
    entry.hourTs = now;
  }

  if (entry.minuteCount >= RATE_PER_MINUTE) return { allowed: false, reason: 'rate_minute' };
  if (entry.hourCount >= RATE_PER_HOUR) return { allowed: false, reason: 'rate_hour' };

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
  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const { message, context, history } = await req.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return Response.json({ error: 'Invalid request.' }, { status: 400 });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return Response.json({ error: 'Message too long.' }, { status: 400 });
    }

    const safeHistory = Array.isArray(history)
      ? history.slice(-MAX_HISTORY_MESSAGES)
      : [];

    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      return Response.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = SYSTEM_INSTRUCTION + (context ? `\n\nCURRENT ARTICLE CONTEXT:\n${context}` : '');

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: { systemInstruction, temperature: 0.7, maxOutputTokens: 512 },
      history: safeHistory.map((m: { role: string; text: string }) => ({
        role: m.role,
        parts: [{ text: m.text }],
      })),
    });

    const result = await chat.sendMessage({ message });
    return Response.json({ text: result.text });
  } catch (err: any) {
    console.error('Chat error:', err);
    return Response.json({ error: 'Service error. Please try again later.' }, { status: 500 });
  }
}

export const config = { runtime: 'edge' };
