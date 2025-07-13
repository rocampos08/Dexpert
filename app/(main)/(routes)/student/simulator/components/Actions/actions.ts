'use server';

import { groq } from '@/lib/groqClient';
import type { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions';

export async function sendToGroq(messages: { role: string; content: string }[], selectedRole: string) {
  // Contar los mensajes del usuario
  const userMessagesCount = messages.filter(m => m.role === 'user').length;

  // Definir si es momento de pedir feedback
  const askForFeedback = userMessagesCount >= 4;

  const systemPromptBase = `
You are a customer or client interacting with a professional in a simulated work scenario.

The user is acting as a ${selectedRole}. Your job is to behave like a real client, asking questions, reporting problems, or requesting help, depending on the role.

Examples:
- For receptionist: “Hi, I have an appointment but I forgot the time.”
- For customer support: “My order was wrong and I need a refund.”
- For admin assistant: “Can you help me schedule a meeting with the director?”

Keep the tone natural and realistic. Do NOT break character.
`;

  // Si es momento de feedback, agrega la instrucción
  const systemPrompt = askForFeedback
    ? systemPromptBase + `
After this message, provide a short feedback in English evaluating the user's performance:
- Were they professional and clear?
- Did they offer solutions?
- How can they improve?
`
    : systemPromptBase;

  const prompt: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: systemPrompt.trim(),
    },
    ...messages.map((m) => ({
      role: m.role as 'system' | 'user' | 'assistant',
      content: m.content,
    })),
  ];

  const res = await groq.chat.completions.create({
    messages: prompt,
    model: 'llama3-70b-8192',
    temperature: 0.7,
    max_tokens: 1000,
  });

  return res.choices[0].message.content;
}
