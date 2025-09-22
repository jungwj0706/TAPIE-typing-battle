import { useEffect, useRef, useState } from 'react';

export default function useTimer({ duration = 60, onTick, onFinish } = {}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef(null);

  const start = () => {
    clearInterval(timerRef.current);
    setTimeLeft(duration);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          onFinish?.();
          return 0;
        }
        const next = prev - 1;
        onTick?.(next);
        return next;
      });
    }, 1000);
  };

  const stop = () => clearInterval(timerRef.current);
  const reset = () => { stop(); setTimeLeft(duration); };

  useEffect(() => () => clearInterval(timerRef.current), []);

  return { timeLeft, start, stop, reset };
}
