import { getGuessStatuses } from "../../lib/statuses";
import { Cell } from "./Cell";

type Props = {
  guess: string;
  guesses: string[];
  index: number
};

export const CompletedRow = ({ guess, guesses, index }: Props) => {
  const statuses = getGuessStatuses(guess);
  const fractionComplete = index/12
  const backgroundColor = `rgba(255, ${255-255*fractionComplete}, ${255-255*fractionComplete}, ${1*fractionComplete})`
  return (
    <div className="flex justify-center mb-1" style={{backgroundColor}}>
      {guess.split("").map((letter, i) => (
        <Cell key={i} value={letter} status={statuses[i]} />
      ))}
    </div>
  );
};
