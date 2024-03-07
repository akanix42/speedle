import classnames from 'classnames';
import { Cell } from "./Cell";
import { useEffect, useRef } from "react";

type Props = {
  guess: string;
  guesses: string[];
  maxGuessCount: number;
};

export const CurrentRow = ({ guess, guesses, maxGuessCount }: Props) => {
  const splitGuess = guess.split("");
  const emptyCells = Array.from(Array(5 - splitGuess.length));
  const myRef = useRef(null)

  const executeScroll = () => (myRef.current! as any).scrollIntoView()
  useEffect(() => {
    if (guesses.length <= 5) {
      return;
    }
    executeScroll();
  }, [guesses])

  const dangerIndex = guesses.length;
  const dangerColorOpacity = dangerIndex/(maxGuessCount - maxGuessCount/2);
  const backgroundColor = `rgba(255, ${255-255*dangerColorOpacity}, ${255-255*dangerColorOpacity}, ${1*dangerColorOpacity})`
  const rowShakeLevel = dangerIndex >= maxGuessCount - maxGuessCount / 4 ? 2 : dangerIndex >= maxGuessCount - maxGuessCount / 2 ? 1 : 0 ;
  const cellShakeLevel = dangerIndex >= maxGuessCount - maxGuessCount / 6 ? 2 : dangerIndex >= maxGuessCount - maxGuessCount / 3 ? 1 : 0 ;
  const classes = classnames(
    "flex justify-center mb-1",
    {
      [`${rowShakeLevel <= 1 ? "shake" : "shake-lots"}`]: rowShakeLevel > 0,
    }
  );

  return (
    <div ref={myRef} className={classes} style={{backgroundColor}}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} shakeLevel={cellShakeLevel} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i}  shakeLevel={cellShakeLevel} />
      ))}
    </div>
  );
};
