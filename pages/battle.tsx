import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import socket from "../utils/socket";
import axios from "axios";
import AIFeedback from "../components/AIFeedback";
import Timer from "../components/timer";
import CodeEditor from "../components/CodeEditor"; // ✅ moved to top

type QuestionType = {
  _id: string;
  title: string;
  description: string;
  input_format: string;
  output_format: string;
  test_cases?: any[];
};

export default function BattleRoom() {
  const router = useRouter();
  const { roomId } = router.query;

  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [code, setCode] = useState("// Write your code here...");
  const [verdict, setVerdict] = useState("");

  useEffect(() => {
    socket.on("startBattle", ({ question }) => {
      setQuestion(question);
    });

    return () => {
      socket.off("startBattle");
    };
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/ai/judge", {
        code,
        language: "javascript",
        testCases: question?.test_cases || [],
      });
      setVerdict(res.data.verdict);
    } catch (err) {
      console.error("Error judging code:", err);
      setVerdict("❌ Failed to judge code");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">🚀 Battle Room: {roomId}</h1>

      {question ? (
        <div className="bg-white p-4 rounded shadow-md mb-4 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold">{question.title}</h2>
          <p className="text-gray-800 whitespace-pre-line">{question.description}</p>
          <div className="mt-2 text-sm text-gray-700">
            <strong>Input:</strong> {question.input_format} <br />
            <strong>Output:</strong> {question.output_format}
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center">Loading question...</p>
      )}

      <Timer
        duration={300} // 5 minutes
        onTimeUp={() => {
          alert("⏰ Time's up! Submitting code...");
          handleSubmit(); // Auto submit on time up
        }}
      />

      {/* ✅ Code Editor Section */}
      <CodeEditor code={code} setCode={setCode} />

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>

      {/* Verdict Display */}
      <AIFeedback verdict={verdict} />
    </div>
  );
}
