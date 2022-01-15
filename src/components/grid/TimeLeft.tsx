import { useEffect, useState } from 'react'
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
    backgroundColor: perc2color(remainingTimePercent),
  }
  const remainingTimeSeconds = Math.max(0, (timeLimitMs - elapsedTimeMs)/1000);
  return (
    <div className="flex justify-center mb-1" style={style}>
      {remainingTimeSeconds.toFixed(2)}
    </div>
  );
};

/* perc2color source: https://gist.github.com/mlocati/7210513 */
function perc2color(perc: number) {
	var r, g, b = 0;
	if(perc < 50) {
		r = 255;
		g = Math.round(5.1 * perc);
	}
	else {
		g = 255;
		r = Math.round(510 - 5.10 * perc);
	}
	var h = r * 0x10000 + g * 0x100 + b * 0x1;
	return '#' + ('000000' + h.toString(16)).slice(-6);
}
