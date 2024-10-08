"use client"; // Enables client-side rendering for this component

import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// interface NumberGuessingState {
//   gameStarted: boolean;
//   gameOver: boolean;
//   paused: boolean;
//   targetNumber: number;
//   userGuess: number | string;
//   attempts: number;
// }

export default function NumberGuessing(): JSX.Element {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<number | string>("");
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    if (gameStarted && !paused) {
      const randomNumber: number = Math.floor(Math.random() * 10) + 1;
      setTargetNumber(randomNumber);
    }
  }, [gameStarted, paused]);

  const handleStartGame = (): void => {
    setGameStarted(true);
    setGameOver(false);
    setAttempts(0);
    setPaused(false);
  };

  const handlePauseGame = (): void => {
    setPaused(true);
  };

  const handleResumeGame = (): void => {
    setPaused(false);
  };

  const handleGuess = (): void => {
    if (typeof userGuess === "number" && userGuess === targetNumber) {
      setGameOver(true);
    } else {
      setAttempts(attempts + 1);
    }
  };

  const handleTryAgain = (): void => {
    setGameStarted(false);
    setGameOver(false);
    setUserGuess("");
    setAttempts(0);
  };

  const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserGuess(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-4 text-purple-700">
          Number Guessing Game
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Try to guess the number between 1 and 10!
        </p>

        {!gameStarted && (
          <div className="flex justify-center mb-6">
            <Button
              onClick={handleStartGame}
              className="bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:from-green-500 hover:to-teal-600 transition duration-300"
            >
              Start Game
            </Button>
          </div>
        )}

        {gameStarted && !gameOver && (
          <div>
            <div className="flex justify-center mb-6">
              {paused ? (
                <Button
                  onClick={handleResumeGame}
                  className="bg-yellow-400 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300"
                >
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={handlePauseGame}
                  className="bg-red-400 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-red-500 transition duration-300"
                >
                  Pause
                </Button>
              )}
            </div>

            <div className="flex justify-center mb-6">
              <Input
                type="number"
                value={userGuess}
                onChange={handleUserGuessChange}
                className="bg-gray-200 border border-gray-400 rounded-lg py-2 px-4 w-full max-w-xs text-center"
                placeholder="Enter your guess"
              />
              <Button
                onClick={handleGuess}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full ml-4 transition duration-300"
              >
                Guess
              </Button>
            </div>

            <div className="text-center text-gray-700">
              <p>Attempts: {attempts}</p>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="text-center text-gray-800">
            <h2 className="text-3xl font-bold text-green-500">Game Over!</h2>
            <p className="text-lg">You guessed the number in {attempts} attempts.</p>
            <div className="flex justify-center mt-6">
              <Button
                onClick={handleTryAgain}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full transition duration-300"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}