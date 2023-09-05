import Timer from "./Timer";
import Progressive from "./Progressive";
import "./styles.css";

// Exam 1
// 1. implement a count value, and make it increase 1 per second (required)
// 2. implement two buttons, they can make the counting value work from debounce and throttle (optional)
// please implement in src/Timer.tsx

// Exam 2
// please implement a function that can make a string progressively display single world via assigned time interval
// please implement in src/Progressive.tsx

export default function App() {
  return (
    <div className="App">
      <h2>Exam 1</h2>
      <Timer />

      <h2>Exam 2</h2>
      <Progressive />
    </div>
  );
}
