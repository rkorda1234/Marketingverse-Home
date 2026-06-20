import { GoogleGenAI } from '@google/genai';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { prompt, input } = await req.json();

    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${prompt}\n\nUser Input: ${input}`,
      config: { temperature: 0.7 },
    });

    return Response.json({ text: response.text });
  } catch (err: any) {
    console.error('Simulate error:', err);
    return Response.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}

export const config = { runtime: 'edge' };
