import { createContext, useState, useContext, useEffect } from "react";
import { openDB } from "idb";
import questionsData from "../data/questions";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [attempts, setAttempts] = useState([]);

  // Initialize IndexedDB
  useEffect(() => {
    const initDB = async () => {
      const db = await openDB("QuizDB", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("attempts")) {
            db.createObjectStore("attempts", { keyPath: "id", autoIncrement: true });
          }
        },
      });

      // Load existing attempts from IndexedDB
      const storedAttempts = await db.getAll("attempts");
      setAttempts(storedAttempts);
    };

    initDB();
  }, []);

  // Function to record an attempt
  const recordAttempt = async (score, category) => {
    const db = await openDB("QuizDB", 1);
    const correct = Number(score ?? 0);

    const newAttempt = { score, category, correctAnswers:correct, wrongAnswers: 10 - correct, date: new Date().toLocaleString() };

    // Add to IndexedDB
    await db.add("attempts", newAttempt);

    // Update state
    setAttempts((prev) => [...prev, newAttempt]);
  };

  return (
    <QuizContext.Provider value={{ questionsData, attempts, recordAttempt }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);

