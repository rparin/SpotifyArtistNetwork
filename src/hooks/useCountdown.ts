import { useEffect, useState } from "react";

/**
 *
 * @param initialTime initial countdown timer in ms
 * @param callback executed function when timer reaches 0
 * @param interval optional interval in ms, default is 1000ms/1s
 */
export const useCountdown = (
  initialTime: number,
  callback: () => void,
  interval = 1000
) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time == 0) {
      callback();
      return;
    }

    const customInterval = setInterval(() => {
      if (time > 0) setTime((prev) => prev - interval);
    }, interval);

    return () => clearInterval(customInterval);
  }, [time, callback, interval]);

  return time;
};
