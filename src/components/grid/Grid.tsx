import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";
import { Overlay } from './Overlay';

type Props = {
  guesses: string[];
  currentGuess: string;
  maxGuessCount: number;
  gameStartedAt: number | null;
  timeLimitMs: number;
};

export const Grid = ({ guesses, currentGuess, maxGuessCount, gameStartedAt, timeLimitMs }: Props) => {
  const initialColumnCount = 5;
  const empties =
    guesses.length < initialColumnCount ? Array.from(Array(initialColumnCount - guesses.length)) : [];
    return (
    <div className="pb-6 grid">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} guesses={guesses} maxGuessCount={maxGuessCount} index={i} />
      ))}
      {guesses.length < maxGuessCount && <CurrentRow guess={currentGuess} guesses={guesses} maxGuessCount={maxGuessCount} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
      {/* <Overlay gameStartedAt={gameStartedAt} timeLimitMs={timeLimitMs} /> */}
    </div>
  );
};
