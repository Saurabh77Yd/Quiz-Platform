import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      {/* Navbar */}
      <nav className="w-full bg-blue-600 text-white py-4 px-6 shadow-md fixed top-0 left-0 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quiz Platform</h1>
        <Link to="/quiz">
          <button className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-200 transition-all">Start Quiz</button>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center mt-20 p-8 bg-white shadow-lg rounded-lg max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-blue-600">Welcome to the Quiz Platform</h1>

        <div className="mb-6 text-left w-full">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Instructions:</h2>
          <ul className="list-disc pl-5 text-lg space-y-2 text-gray-600">
            <li>For multiple-choice questions, select the one best answer (A, B, C, or D).</li>
            <li>For integer-type questions, write your numerical answer clearly.</li>
            <li>No calculators unless specified.</li>
            <li>You have 30 minutes to complete this quiz.</li>
          </ul>
        </div>

        <Link to="/quiz">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600 transition-all shadow-md">
            Start Quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
