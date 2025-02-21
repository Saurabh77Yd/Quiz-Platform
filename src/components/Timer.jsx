import { useEffect } from "react";

const Timer = ({ timeLeft, setTimeLeft }) => {
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, setTimeLeft]);

  // Dynamic color based on time left
  const getTimerColor = () => {
    if (timeLeft > 10) return "text-green-500";
    if (timeLeft <= 10 && timeLeft > 5) return "text-yellow-500";
    return "text-red-500 animate-pulse";
  };

  return (
    <div className={`flex items-center gap-2 text-lg font-bold ${getTimerColor()}`}>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Time Left: {timeLeft} sec</span>
    </div>
  );
};

export default Timer;


