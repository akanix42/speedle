import { getGuessStatuses } from "../../lib/statuses";
import { Cell } from "./Cell";
import classnames from "classnames";

type Props = {
  guess: string;
  guesses: string[];
  index: number;
  maxGuessCount: number;
};

export const CompletedRow = ({ guess, guesses, index, maxGuessCount }: Props) => {
  const statuses = getGuessStatuses(guess);
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
    <div className={classes} style={{backgroundColor}}>
      {guess.split("").map((letter, i) => (
        <Cell key={i} value={letter} status={statuses[i]} shakeLevel={cellShakeLevel} />
      ))}
    </div>
  );
};
