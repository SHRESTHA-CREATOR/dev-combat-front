import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import socket from "../utils/socket";
import axios from "axios";
import AIFeedback from "../components/AIFeedback";
import Timer from "../components/timer";
import CodeEditor from "../components/CodeEditor";

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
  const [waiting, setWaiting] = useState(true); // 🔵 Waiting initially true

  useEffect(() => {
    if (!roomId) return;

    // Join room socket event
    socket.emit("joinRoom", roomId);

    socket.on("waiting", () => {
      console.log("🕓 Waiting for opponent...");
      setWaiting(true);
    });

    socket.on("startBattle", ({ question }) => {
      console.log("🚀 Battle started, received question:", question);
      setQuestion(question);
      setWaiting(false);
    });

    return () => {
      socket.off("waiting");
      socket.off("startBattle");
    };
  }, [roomId]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ai/judge`,
        {
          code,
          language: "javascript",
          testCases: question?.test_cases || [],
        }
      );
      setVerdict(res.data.verdict);
    } catch (err) {
      console.error("❌ Error judging code:", err);
      setVerdict("❌ Failed to judge code");
    }
  };

  if (waiting) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-700">
        ⏳ Connected to room {roomId} — Waiting for opponent...
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-500">
        Loading question...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">🚀 Battle Room: {roomId}</h1>

      <div className="bg-white p-4 rounded shadow-md mb-4 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold">{question.title}</h2>
        <p className="text-gray-800 whitespace-pre-line">{question.description}</p>
        <div className="mt-2 text-sm text-gray-700">
          <strong>Input:</strong> {question.input_format} <br />
          <strong>Output:</strong> {question.output_format}
        </div>
      </div>

      <Timer
        duration={300} // 5 minutes
        onTimeUp={() => {
          alert("⏰ Time's up! Submitting code...");
          handleSubmit(); // Auto submit on time up
        }}
      />

      <CodeEditor code={code} setCode={setCode} />

      <div className="flex justify-center my-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>

      <AIFeedback verdict={verdict} />
    </div>
  );
}

