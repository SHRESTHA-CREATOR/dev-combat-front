// frontend/components/Timer.tsx
import React, { useEffect, useState } from "react";

type Props = {
  duration: number; // in seconds
  onTimeUp: () => void;
};

const Timer: React.FC<Props> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          onTimeUp();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (t: number) => {
    const min = Math.floor(t / 60);
    const sec = t % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-center mb-4 text-xl font-semibold text-red-600">
      ⏳ Time Left: {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;
