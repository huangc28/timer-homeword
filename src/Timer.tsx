// Exam 1
// 1. implement a count value, and make it increase 1 per second (required)
// 2. implement two buttons, they can make the counting value work from debounce and throttle (optional)

import { useState, useEffect } from "react";

let debounceID: null | NodeJS.Timeout = null;
let throttleLastCall: number = 0;

/**
 * Callback is only triggered if you don't click again within specified time interval.
 */
const useDebounce = (callback: () => void, time: number) => {
  return (...args: any) => {
    if (debounceID) {
      clearTimeout(debounceID)
    }

    debounceID = setTimeout(() => {
      callback();
      debounceID = null
    }, time);
  }
};

/**
 * Invoke callback immediately, but sebsequent callback within specified time interval
 * will be dropped.
 */
const useThrottle = (callback: () => void, time: number) => {
  const now = Date.now();

  return (...args: any) => {
    if (now - throttleLastCall > time) {
      callback();
      throttleLastCall = now;
    }
  }
};

export default function Timer() {
  const [count, setCount] = useState<number>(0);
  const [debounceCount, setDebounceCount] = useState<number>(0);
  const [throttleCount, setThrottleCount] = useState<number>(0);

  const incrementByDebounce = useDebounce(() => {
    setCount(prev => prev + 1);
    setDebounceCount(prev => prev + 1);
  }, 1500);

  const incrementByThrottle = useThrottle(() => {
    setCount(prev => prev + 1);
    setThrottleCount(prev => prev + 1);
  }, 1500);


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
          <button onClick={incrementByDebounce}>start debounce</button>
          <div>debounce count: {debounceCount}</div>
        </div>
        <div>
          <button onClick={incrementByThrottle}>start throttle</button>
          <div>throttle count: {throttleCount}</div>
        </div>
      </div>
    </>
  );
}
