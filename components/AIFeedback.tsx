// frontend/components/AIFeedback.tsx
import React from "react";

type Props = {
  verdict?: string; // Optional verdict
};

const AIFeedback: React.FC<Props> = ({ verdict }) => {
  if (!verdict) return null;

  return (
    <section className="mt-6 max-w-3xl mx-auto p-4 bg-green-100 border border-green-400 rounded text-green-800 shadow-sm">
      <h3 className="font-semibold mb-1">🧠 AI Verdict</h3>
      <p>{verdict}</p>
    </section>
  );
};

export default AIFeedback;
