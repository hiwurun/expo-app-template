import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

export function useOtpCountdown(initialSeconds = 60) {
  const [remaining, setRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const update = () => {
    const now = Date.now();
    const elapsed = Math.floor((now - startTimeRef.current) / 1000);
    const left = Math.max(0, initialSeconds - elapsed);

    setRemaining(left);

    if (left <= 0) {
      setIsRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const start = () => {
    startTimeRef.current = Date.now();
    setRemaining(initialSeconds);
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning) return;

    update();
    timerRef.current = setInterval(update, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // 监听前后台切换，切回前台时强制刷新
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active' && isRunning) {
        update();
      }
    });
    return () => subscription.remove();
  }, [isRunning]);

  return {
    seconds: remaining,
    isRunning,
    isFinished: remaining === 0,
    start,
  };
}
