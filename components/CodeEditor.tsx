// frontend/components/CodeEditor.tsx
import React from "react";

type Props = {
  code: string;
  setCode: (code: string) => void;
};

const CodeEditor: React.FC<Props> = ({ code, setCode }) => {
  return (
    <div className="max-w-3xl mx-auto mb-4">
  <label className="block mb-2 font-medium text-gray-200">💻 Your Code:</label>
  <textarea
    value={code}
    onChange={(e) => setCode(e.target.value)}
    rows={12}
    className="w-full p-4 font-mono border border-gray-600 rounded bg-gray-900 text-white shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
  />
</div>

    
  );
};

export default CodeEditor;
