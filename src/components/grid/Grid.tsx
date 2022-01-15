import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";

type Props = {
  guesses: string[];
  currentGuess: string;
  maxGuessCount: number;
};

export const Grid = ({ guesses, currentGuess, maxGuessCount }: Props) => {
  const initialColumnCount = 5;
  const empties =
    guesses.length < initialColumnCount ? Array.from(Array(initialColumnCount - guesses.length)) : [];
    return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} guesses={guesses} index={i} />
      ))}
      {guesses.length < maxGuessCount && <CurrentRow guess={currentGuess} guesses={guesses} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  );
};
