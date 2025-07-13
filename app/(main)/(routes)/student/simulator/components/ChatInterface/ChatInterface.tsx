'use client';

import { useState } from 'react';
import { sendToGroq } from '../Actions/actions';

type Props = {
  role: string;
  onBack: () => void;
};

export default function ChatInterface({ role, onBack }: Props) {
  const [messages, setMessages] = useState([{ role: 'system', content: `You're simulating a ${role}. Respond professionally.` }]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const response = await sendToGroq(newMessages, role);
    setMessages([...newMessages, { role: 'assistant', content: response ?? '' }]);
  };

  return (
    <div className="mt-4 space-y-4">
      <button onClick={onBack} className="text-blue-500 underline">← Back to roles</button>

      <div className="bg-white p-4 rounded-lg h-[400px] overflow-y-auto border">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block text-[#0a2342] px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your response..."
          className="flex-grow p-2 text-gray-700 border rounded-lg"
        />
        <button onClick={handleSend} className="bg-[#0a2342] text-white px-4 py-2 rounded-lg">Send</button>
      </div>
    </div>
  );
}
