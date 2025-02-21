import { useQuiz } from "../context/QuizContext";
import { useState, useEffect } from "react";
import Timer from "../components/Timer";
import Scoreboard from "../components/Scoreboard";

const QuizPage = () => {
  const { questionsData, recordAttempt } = useQuiz();

  // Combine all question types into one array
  const allQuestions = Object.values(questionsData).flat();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedOption, setSelectedOption] = useState(null);
  const [integerAnswer, setIntegerAnswer] = useState("");
  const [correctAnswerFeedback, setCorrectAnswerFeedback] = useState("");
  const [answerStatus, setAnswerStatus] = useState(""); // "correct" or "wrong"

  const currentQ = allQuestions[currentQuestion];
  const isIntegerType = !currentQ.options;

  // Handle timer reaching zero
  useEffect(() => {
    if (timeLeft === 0) {
      nextQuestion();
    }
  }, [timeLeft]);

  const handleAnswer = (selected) => {
    setSelectedOption(selected);
    const correctAnswer = currentQ.answer;
    if ((currentQ.options && selected === correctAnswer) || (!currentQ.options && parseInt(selected) === correctAnswer)) {
      setScore(score + 1);
      setCorrectAnswerFeedback("Correct!");
      setAnswerStatus("correct");
    } else {
      setCorrectAnswerFeedback(`Correct answer: ${correctAnswer}`);
      setAnswerStatus("wrong");
    }
    setTimeout(() => nextQuestion(), 2000);
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setIntegerAnswer("");
    setCorrectAnswerFeedback("");
    setAnswerStatus("");
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
    } else {
      setShowResults(true);
      recordAttempt(score); //  No category needed
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
      answerStatus === "correct" ? "bg-green-100" : 
      answerStatus === "wrong" ? "bg-red-100" : "bg-gradient-to-br from-blue-50 to-blue-100"
    }`}>
      {showResults ? (
        <Scoreboard score={score} />
      ) : (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300">
          {/* Question Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {currentQ.question}
            </h2>
            <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
          </div>

          {/* Answer Section */}
          <div className="space-y-4">
            {isIntegerType ? (
              // Integer Input Section
              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={integerAnswer}
                    onChange={(e) => setIntegerAnswer(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter your answer"
                    disabled={!!selectedOption}
                  />
                  <button
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleAnswer(integerAnswer)}
                    disabled={!integerAnswer || !!selectedOption}
                  >
                    Submit
                  </button>
                </div>
                {selectedOption && correctAnswerFeedback && (
                  <p className={`text-sm font-semibold ${
                    correctAnswerFeedback === "Correct!" 
                      ? "text-green-600" 
                      : "text-red-600"
                  }`}>
                    {correctAnswerFeedback}
                  </p>
                )}
              </div>
            ) : (
              // Multiple Choice Options
              <div className="grid gap-3">
                {currentQ.options.map((option, index) => {
                  let optionStyle = "bg-gray-100 hover:bg-gray-200 text-gray-800";
                  if (selectedOption) {
                    if (option === currentQ.answer) {
                      optionStyle = "bg-green-100 text-green-800 border-2 border-green-300";
                    } else if (option === selectedOption) {
                      optionStyle = "bg-red-100 text-red-800 border-2 border-red-300";
                    }
                  }

                  return (
                    <button
                      key={index}
                      className={`w-full px-6 py-4 text-left rounded-lg transition-all duration-200 ${optionStyle} ${
                        !selectedOption ? "hover:translate-x-2" : ""
                      }`}
                      onClick={() => !selectedOption && handleAnswer(option)}
                      disabled={!!selectedOption}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
