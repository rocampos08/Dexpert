'use client';

import { useState } from 'react';
import RoleSelector from './components/RoleSelector/RoleSelector';
import ChatInterface from './components/ChatInterface/ChatInterface';

export default function SimulatorPage() {
  const [role, setRole] = useState<string | null>(null);

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-[#0a2342]">AI Role Simulator</h1>

      {!role ? (
        <RoleSelector onSelectRole={setRole} />
      ) : (
        <ChatInterface role={role} onBack={() => setRole(null)} />
      )}
    </main>
  );
}
