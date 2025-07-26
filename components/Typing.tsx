"use client";
import React, { useEffect, useState } from "react";
import { generate } from "random-words";
import clsx from "clsx";
import Result from "./Result";
import WordsBar from "./WordTimeBar";

export default function Typing() {
  const [wordList, setWordList] = useState<string[]>([]);
  const [quote, setQuote] = useState("");
  const [typed, setTyped] = useState("");
  const [testDuration, setTestDuration] = useState(60);
  const [wordsCount, setWordsCount] = useState(60);
  const [timeLeft, setTimeLeft] = useState(testDuration);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const isRunning = startTime !== null && !isFinished;

  // Initialize quote & reset test state
  useEffect(() => {
    setIsClient(true);
    setIsFinished(false);
    setTyped("");
    setStartTime(null);
    setTimeLeft(testDuration);

    const newWords = generate(wordsCount) as string[];
    setWordList(newWords);
    setQuote(newWords.join(" "));
  }, [wordsCount, testDuration]);

  // Timer countdown
  useEffect(() => {
    if (!startTime || isFinished) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isFinished]);

  // Finish test if all characters are typed
  useEffect(() => {
    if (startTime!==null && !isFinished && typed.length >= quote.length) {
      finishTest();
    }
  }, [typed, quote, isFinished]);

  // Typing input listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished) return;

      if (!startTime) {
        setStartTime(Date.now());
        setTimeLeft(testDuration);
      }

      if (e.key === "Backspace") {
        setTyped((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1) {
        setTyped((prev) => (prev + e.key).slice(0, quote.length));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFinished, startTime, testDuration, quote.length]);

  const finishTest = () => {
    setIsFinished(true);
  };

  const restartTest = () => {
    const newWords = generate(wordsCount) as string[];
    setWordList(newWords);
    setQuote(newWords.join(" "));
    setTyped("");
    setTimeLeft(testDuration);
    setStartTime(null);
    setIsFinished(false);
  };

  // Stats
  let correctChars = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === quote[i]) correctChars++;
  }

  const minutes = (testDuration - timeLeft) / 60;
  const wpm = minutes > 0 ? Math.round(correctChars / 5 / minutes) : 0;
  const accuracy = typed.length === 0 ? 0 : Math.round((correctChars / typed.length) * 100);

  if (!isClient) {
    return (
      <main className="flex items-center justify-center h-[calc(100vh-104px)] bg-black text-white">
        <span className="text-xl text-gray-400">Loading...</span>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-104px)] flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] px-4 py-10 text-white">
      <div className="w-full max-w-6xl rounded-2xl p-10 shadow-2xl border border-gray-700 bg-black/40 backdrop-blur-xl space-y-6">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <WordsBar
              onSelectCnt={(val) => setWordsCount(val)}
              onSelectTimer={(val) => {
                setTestDuration(val);
                setTimeLeft(val);
              }}
              disabled={isRunning}
            />
            <span className=" text-gray-400 font-bold text-sm"> &lt;- Adjust settings</span>
          </div>
          <div className="text-2xl font-semibold text-yellow-400">
            ⏳ {timeLeft}s
          </div>
        </div>

        {/* Typing Area */}
        {!isFinished && (
          <div className="bg-[#111] border border-gray-600 rounded-xl p-6 h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
            <div className="text-xl sm:text-2xl font-mono leading-relaxed tracking-wide break-words">
              {quote.split("").map((char, index) => {
                let className = "text-gray-500";
                if (index < typed.length) {
                  className = typed[index] === char ? "text-white" : "text-red-500";
                }
                if (index === typed.length) {
                  className += " underline decoration-yellow-400";
                }
                return (
                  <span key={index} className={clsx(className)}>
                    {char}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Results */}
        {isFinished && (
          <Result wpm={wpm} accuracy={accuracy} restartTest={restartTest} />
        )}
      </div>
    </main>
  );
}
