// frontend/pages/index.tsx
import { useEffect, useState } from "react";
import socket from "../utils/socket";
import { useRouter } from "next/router";

type QuestionType = {
  _id: string;
  title: string;
  description: string;
  input_format: string;
  output_format: string;
};

export default function Home() {
  const [status, setStatus] = useState("🔌 Connecting...");
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const router = useRouter();

  useEffect(() => {
    socket.on("connect", () => {
      setStatus("🟢 Connected to Dev Battle server. Waiting for opponent...");
    });

    socket.on("waiting", (msg: string) => {
      setStatus(`⏳ ${msg}`);
    });

    socket.on("startBattle", ({ roomId, question }) => {
      setStatus("🔥 Battle Started!");
      setQuestion(question);

      // Navigate to battle page
      setTimeout(() => {
        router.push(`/battle/${roomId}`);
      }, 2000);
    });

    socket.on("disconnect", () => {
      setStatus("🔴 Disconnected from server.");
    });

    // Cleanup on unmount
    return () => {
      socket.off("connect");
      socket.off("waiting");
      socket.off("startBattle");
      socket.off("disconnect");
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-brand">
  <h1 className="text-4xl font-bold text-white mb-4">👊 Dev Battles</h1>
  <p className="text-lg text-gray-300 mb-6">{status}</p>

  {question && (
    <div className="bg-brand-light shadow-xl p-6 rounded-lg w-full max-w-2xl border border-gray-700">
      <h2 className="text-2xl font-semibold mb-2 text-white">{question.title}</h2>
      <p className="text-gray-300 whitespace-pre-line">{question.description}</p>
      <p className="text-sm text-gray-400 mt-2">
        <strong>Input:</strong> {question.input_format}
        <br />
        <strong>Output:</strong> {question.output_format}
      </p>
    </div>
  )}
</main>

  );
}
