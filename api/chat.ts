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

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { message, context, history } = await req.json();

    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = SYSTEM_INSTRUCTION + (context ? `\n\nCURRENT ARTICLE CONTEXT:\n${context}` : '');

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: { systemInstruction, temperature: 0.7 },
      history: (history || []).map((m: { role: string; text: string }) => ({
        role: m.role,
        parts: [{ text: m.text }],
      })),
    });

    const result = await chat.sendMessage({ message });
    return Response.json({ text: result.text });
  } catch (err: any) {
    console.error('Chat error:', err);
    return Response.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}

export const config = { runtime: 'edge' };
