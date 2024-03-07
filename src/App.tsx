import { InformationCircleIcon } from "@heroicons/react/outline";
import { useState, useEffect, useRef } from "react";

import { Alert } from "./components/alerts/Alert";
import { Grid } from "./components/grid/Grid";
import { TimeLeft } from './components/grid/TimeLeft';
import { Keyboard } from "./components/keyboard/Keyboard";
import { AboutModal } from "./components/modals/AboutModal";
import { InfoModal } from "./components/modals/InfoModal";
import { WinModal } from "./components/modals/WinModal";
import { clearGameState, getGameState, storeGameState } from './lib/gameState';
import { isWordInWordList, isWinningWord, getDay } from "./lib/words";

function App() {
  const [backgroundColor, setBackgroundColor] = useState("");
  const existingGameState = getGameState();
  const [guesses, setGuesses] = useState<string[]>(existingGameState?.guesses || []);
  const [currentGuess, setCurrentGuess] = useState(existingGameState?.currentGuess || "");
  const [guessTimeStartedAt, setGuessTimeStartedAt] = useState(null as number|null);
  const [isGameWon, setIsGameWon] = useState(existingGameState?.isGameWon || false);
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false);
  const [isGameLost, setIsGameLost] = useState(existingGameState?.isGameLost || false);
  const [gameStartedAt, setGameStartedAt] = useState(existingGameState?.gameStartedAt || null);

  const maxGuessCount = 12;
  const guessTimeLimitMs = 8000;
  const timeLimitMs = maxGuessCount * guessTimeLimitMs;
  const acceptedWordLength = 5;

  useEffect(() => {
    if (isGameWon || isGameLost) {
      setIsWinModalOpen(true);
    }
  }, [isGameWon, isGameLost]);

  const guessesRef = useRef([] as string[]);
  const currentGuessRef = useRef('');
  const isGameWonRef = useRef(false);
  const guessTimeStartedAtRef = useRef<number|null>(null);

  useEffect(() => {
    guessesRef.current = guesses;
  }, [guesses]);

  useEffect(() => {
    currentGuessRef.current = currentGuess;
  }, [currentGuess]);

  useEffect(() => {
    isGameWonRef.current = isGameWon;
  }, [isGameWon]);

  useEffect(() => {
    guessTimeStartedAtRef.current = guessTimeStartedAt;
  }, [guessTimeStartedAt]);

    // Add event listeners
  const onChar = (value: string) => {
    if (currentGuess.length < acceptedWordLength) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };
  useEffect(() => {
    console.log('store game state')
    if (gameStartedAt === null) {
      return;
    }

    storeGameState({dayIndex: getDay(), gameStartedAt, isGameWon, isGameLost, guesses, currentGuess})
  }, [gameStartedAt, isGameLost, isGameWon, guesses, currentGuess]);

  // useEffect(() => {
  //   if (gameStartedAt === null) {
  //     return;
  //   }

  //   const intervalId = setInterval(() => {
  //     const updatedAt = Date.now();
  //     const elapsedTimeMs = updatedAt - gameStartedAt;
  //     const opaqueTimeLimitMs = timeLimitMs-(timeLimitMs/2);
  //     // console.log(1, gameStartedAt, updatedAt, elapsedTimeMs)
  //     const dangerColorOpacity = elapsedTimeMs/opaqueTimeLimitMs;
  //     setBackgroundColor(`rgba(255, ${255-255*dangerColorOpacity}, ${255-255*dangerColorOpacity}, ${1*dangerColorOpacity})`);
  //   }, 10);

  //   return () => clearInterval(intervalId)
  // }, [gameStartedAt, timeLimitMs])

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };
  let turnSkipTimeout: NodeJS.Timeout;
  function submitWord(isTurnSkipped: boolean, currentGuess: string, guesses: string[], isGameWon: boolean) {
    if (guesses.length >= maxGuessCount
      || isGameWon
      || currentGuess.length !== acceptedWordLength) {
      return
    }
    if (gameStartedAt === null) {
      setGameStartedAt(Date.now());
      console.log('game started at', gameStartedAt)
    }
    if (!isTurnSkipped && !isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true);
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false);
      }, 2000);
    }
    if (turnSkipTimeout) {
      clearTimeout(turnSkipTimeout)
    }

    const winningWord = isWinningWord(currentGuess);
    setGuesses([...guesses, currentGuess]);
    if (!isTurnSkipped || !currentGuess.includes(" ")) {
      setCurrentGuess("");
    }

    if (winningWord) {
      return setIsGameWon(true);
    }

    if (guessesRef.current.length === maxGuessCount) {
      return setIsGameLost(true);
    }
    setGuessTimeStartedAt(Date.now());
    turnSkipTimeout = setTimeout(() => {
      if (guesses.length + 1 !== guessesRef.current.length) {
        return;
      }

      submitWord(
        true,
        currentGuessRef.current.padEnd(acceptedWordLength, ' '),
        guessesRef.current,
        isGameWonRef.current
        )
    }, guessTimeLimitMs);
  };
  const isTimerActive = () => guessTimeStartedAt !== null && !isGameWon && !isGameLost;
  const onEnter = () => submitWord(false, currentGuessRef.current, guessesRef.current, isGameWonRef.current);
  useEffect(() => {
    const downHandler = ({ key, altKey, ctrlKey, metaKey }: KeyboardEvent) => {
        key = key.toLocaleUpperCase()
        if (key === "ENTER") {
          return onEnter();
        }
        if (key === "DELETE" || key === "BACKSPACE") {
          return onDelete();
        }
        if (altKey || ctrlKey || metaKey || !key.match(/^[A-Z]$/)) {
          return;
        }
        onChar(key);
    }
    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  });
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8" style={{backgroundColor}}>
      <Alert message="Word not found" isOpen={isWordNotFoundAlertOpen} />
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-xl grow font-bold">Speedle</h1>
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsInfoModalOpen(true)}
        />
      </div>
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        maxGuessCount={maxGuessCount}
        gameStartedAt={gameStartedAt}
        timeLimitMs={timeLimitMs}
      />
      {isTimerActive() && <TimeLeft startedAt={guessTimeStartedAt!} timeLimitMs={guessTimeLimitMs} />}
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      <WinModal
        isGameWon={isGameWon}
        isOpen={isWinModalOpen}
        handleClose={() => setIsWinModalOpen(false)}
        guesses={guesses}
        maxGuessCount={maxGuessCount}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
        guessTimeLimitMs={guessTimeLimitMs}
        maxGuessCount={maxGuessCount}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />
      {!isTimerActive() && <div className="flex">
        <button
          type="button"
          className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsAboutModalOpen(true)}
        >
          About this game
        </button>
        {(isGameWon || isGameLost) && <button
          type="button"
          className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsWinModalOpen(true)}
        >
          Show Result
        </button>}
        <button
          type="button"
          className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => clearGameState()}
        >
          Reset Game
        </button>
      </div>}
    </div>
  );
}

export default App;
