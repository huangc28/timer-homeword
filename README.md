## Exam 1

### Increase count by 1 per second
We use `setInterval` to tick every 1000 milliseconds (1 second). we increment the previous count by 1 on every tick.

### useDebounce

Invoke callback only if user does not click on it within specified time interval (1sec, 2sec etc...)


### useThrottole

Only allow 1 callback invocation within specified throttle time, the subsequent calls within throttle time will be ignored.
## Exam 2

### Behaviors

**change string**

Update the string user intend to display

**change time**

Update the delay time for the next display of the string. Don't update time If the time string isn't numeric,

**handle start**

Start display string progressively. Reset string previous displayed.

**handle clear**

Clear all controlled states including `inputString`, `MiniSec`, `displayString` and time interval to discard invocation of previous
callback.

### Approach

Use `setInterval` that ticks on every specified delayed time. Each callback invocation we display concatted string inside the `textArea`



