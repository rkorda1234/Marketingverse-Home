interface HistoryMessage {
  role: 'user' | 'model';
  text: string;
}

let conversationHistory: HistoryMessage[] = [];

export const resetChat = () => {
  conversationHistory = [];
};

export const sendMessageToGemini = async (message: string, context?: string): Promise<string> => {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context, history: conversationHistory }),
    });

    const data = await res.json();
    if (!res.ok || data.error) {
      return data.error || "I encountered an error. Please try again.";
    }

    conversationHistory.push({ role: 'user', text: message });
    conversationHistory.push({ role: 'model', text: data.text });

    return data.text;
  } catch (error) {
    console.error('Chat error:', error);
    return "I encountered a connection error. Please try again in a moment.";
  }
};
