import { Cell } from "./Cell";
import { useEffect, useRef } from "react";

type Props = {
  guess: string;
  guesses: string[];
};

export const CurrentRow = ({ guess, guesses }: Props) => {
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

  return (
    <div ref={myRef} className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  );
};
