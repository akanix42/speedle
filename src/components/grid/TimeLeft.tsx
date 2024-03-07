import { useEffect, useState } from 'react'
import { perc2Color } from '../../lib/perc2Color';

type TimeLeftProps = {
  startedAt: number;
  timeLimitMs: number;
};

type TimeLeftDisplayProps = {
  updatedAt: number;
  startedAt: number;
  timeLimitMs: number;
};

export const TimeLeft = ({ startedAt, timeLimitMs }: TimeLeftProps) => {
  const [updatedAt, setUpdatedAt] = useState(Date.now());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setUpdatedAt(Date.now())
    }, 10)


    return () => clearInterval(intervalId)
  }, [])
  return (
    <TimeLeftDisplay updatedAt={updatedAt} startedAt={startedAt} timeLimitMs={timeLimitMs} />
  );
};

const TimeLeftDisplay = ({ updatedAt, startedAt, timeLimitMs }: TimeLeftDisplayProps) => {
  const elapsedTimeMs = updatedAt - startedAt;
  const remainingTimePercent = Math.max(0, 100 - (elapsedTimeMs/timeLimitMs) * 100);
  const style = {
    backgroundColor: perc2Color(remainingTimePercent),
  }
  const remainingTimeSeconds = Math.max(0, (timeLimitMs - elapsedTimeMs)/1000);
  return (
    <div className="flex justify-center mb-1" style={style}>
      {remainingTimeSeconds.toFixed(2)}
    </div>
  );
};
