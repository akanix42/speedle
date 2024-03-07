import { useState, useEffect, useRef } from "react";

type Props = {
  gameStartedAt: number | null;
  timeLimitMs: number;
};

export const Overlay = ({ gameStartedAt, timeLimitMs }: Props) => {
  const [backgroundColor, setBackgroundColor] = useState("");
  useEffect(() => {
    if (gameStartedAt === null) {
      return;
    }

    const intervalId = setInterval(() => {
      const updatedAt = Date.now();
      const elapsedTimeMs = updatedAt - gameStartedAt;
      const opaqueTimeLimitMs = timeLimitMs-(timeLimitMs/2);
      const dangerColorOpacity = Math.min((elapsedTimeMs/opaqueTimeLimitMs), .7);
      // console.log(2, gameStartedAt, updatedAt, elapsedTimeMs)

      setBackgroundColor(`rgba(255, ${255-255*dangerColorOpacity}, ${255-255*dangerColorOpacity}, ${1*dangerColorOpacity})`);
    }, 10);


    return () => clearInterval(intervalId)
  }, [gameStartedAt, timeLimitMs])

  return (
    <div className="overlay" style={{backgroundColor}}>
    </div>
  );
};
