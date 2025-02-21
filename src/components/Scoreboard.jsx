import { useQuiz } from "../context/QuizContext";
import { Link } from "react-router-dom";

const Scoreboard = ({ score, category }) => {
  const { attempts } = useQuiz();

  return (
    
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg w-4/5 mx-auto">

      <h2 className="text-3xl font-extrabold text-blue-600">Your Score: <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{score}</span></h2>
      <h3 className="text-lg mt-3">
        Correct: <span className="text-green-600 font-semibold">{score}</span> / 10
      </h3>
      <h3 className="mt-6 text-2xl font-bold text-gray-700">Attempt History {category}</h3>
      <ul className="mt-4 w-full flex flex-wrap justify-between gap-4">
        {attempts
          .filter((attempt) => attempt.category === category)
          .map((attempt, index) => (
            <li
              key={index}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200 bg-white w-full md:w-[48%] lg:w-[32%]"
            >
              <div className="flex justify-between">
                <strong className="text-gray-700">Score:</strong>
                <span className="text-blue-600 font-bold">{attempt.score}</span>
              </div>
              <div className="flex justify-between mt-1">
                <strong className="text-gray-700">Correct:</strong>
                <span className="text-green-600 font-bold">{attempt.correctAnswers}</span>
              </div>
              <div className="flex justify-between mt-1">
                <strong className="text-gray-700">Wrong:</strong>
                <span className="text-red-600 font-bold">{attempt.wrongAnswers}</span>
              </div>
              <div className="flex justify-between mt-1">
                <strong className="text-gray-700">Date:</strong>
                <span className="text-gray-500">{attempt.date}</span>
              </div>
            </li>
          ))}
      </ul>

      <Link to="/">
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
          Try Again
        </button>
      </Link>
    </div>
  );
};

export default Scoreboard;



