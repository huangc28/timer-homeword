// Exam 1
// 1. implement a count value, and make it increase 1 per second (required)
// 2. implement two buttons, they can make the counting value work from debounce and throttle (optional)

import { useState, useEffect } from "react";

const useDebounce = (callback: () => void, time: number) => {
  // write down your code
};

const useThrottle = (callback: () => void, time: number) => {
  // write down your code
};

export default function Timer() {
  const [count, setCount] = useState<number>(0);
  const [debounceCount, setDebounceCount] = useState<number>(0);
  const [throttleCount, setThrottleCount] = useState<number>(0);

  useEffect(() => {
    const tick = () => setCount(prevCount => prevCount + 1);
    const tiID = setInterval(tick, 1000);

    return () => {
      clearInterval(tiID);
    }
  }, [setCount]);

  return (
    <>
      <h3>Hello, Timer</h3>
      <div className="count">{count}</div>
      <div className="conditional-count">
        <div>
          <button>start debounce</button>
          <div>debounce count: {debounceCount}</div>
        </div>
        <div>
          <button>start throttle</button>
          <div>throttle count: {throttleCount}</div>
        </div>
      </div>
    </>
  );
}
