// Exam 2
// please implement a function that can make a string progressively display single world (word, typo?) via (on each) assigned time interval
import { useEffect, useCallback, useState } from "react";

import { isNumericString } from './utils';

let intervalID: null | NodeJS.Timeout = null;

const runProgressive = async (
  inputString: string,
  miniSec: number, // (milli, typo?)
  callback: (currentString: string) => void
) => {
  // We need a `setInterval` to invoke callback on every tick of specified `miniSec`.
  // What if intervalID already exists? We clear the previous interval and start out
  // a new one.
  if (intervalID) {
    clearInterval(intervalID);
  }

  // Invoke callback on every tick of `miniSec`.
  intervalID = setInterval(() => {
    callback(inputString);
    intervalID = null;
  }, miniSec);
};

export default function Progressive() {
  const [inputString, setInputString] = useState<string>("");
  const [miniSec, setMiniSec] = useState<string>("");
  const [displayString, setDisplayString] = useState<string>("");
  const [isDisplaying, setIsDisplaying] = useState(false);

  const handleChangeString = useCallback((e: any) => {
    const newString = e.target.value;
    setInputString(newString);
  }, []);

  /**
   * What if string is non-numeric? If string is non-numeric, we guard against it.
   *
   */
  const handleChangeTime = useCallback((e: any) => {
    const newTime = e.target.value;
    if (!isNumericString(newTime)) return;
    setMiniSec(newTime);
  }, []);

  /**
   * Problem: `isDisplaying` is not changing?
   */
  const handleStart = useCallback(() => {
    if (!inputString || !miniSec || isDisplaying) {
      return;
    }

    setDisplayString("");
    setIsDisplaying(true);

    runProgressive(inputString, Number(miniSec), (currentString) => {
      setDisplayString((prev) =>
        // If previous string is not empty, concat both previous and currentString and display it.
        // If previous string is empty, display currentString
        !!prev ? `${prev} ${currentString}` : currentString
      );
    });
  }, [inputString, miniSec, isDisplaying]);

  /**
   * Clear all states. Don't forget to clear the time interval if exists any.
   *
   * return when `isDiplaying` is true? We should clear the states while `isDiplaying` is true.
   * is there something logically wrong here?
   */
  const handleClear = useCallback(() => {
    if (isDisplaying) { // We should clear the states when `isDisplaying` is true.
      return;
    }

    setInputString("");
    setMiniSec("");
    setDisplayString("");

    if (intervalID) {
      clearInterval(intervalID);
      intervalID = null;
    }
  }, [isDisplaying]);

  useEffect(() => {
    // If user hasn't changed input string from the display string while pressing start,
    // the progressive display will start over.
    if (inputString && displayString && inputString === displayString) {
      setIsDisplaying(false);
    }
  }, [inputString, displayString]);

  return (
    <>
      <h3>Hello, Progressive</h3>
      <div className="input-area">
        <label>
          Display string:{" "}
          <input
            value={inputString}
            placeholder="Hello JS World"
            onChange={handleChangeString}
          />
        </label>
        <label>
          Progressive time (ms):{" "}
          <input
            value={miniSec}
            placeholder="1000"
            onChange={handleChangeTime}
          />
        </label>
      </div>
      <div className="btn-group">
        <button className="start-btn" onClick={handleStart}>
          Start!
        </button>
        <button className="start-btn" onClick={handleClear}>
          Clear!
        </button>
      </div>
      <div className="display-area">{displayString}</div>
    </>
  );
}
