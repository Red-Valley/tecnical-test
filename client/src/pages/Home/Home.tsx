import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-center px-10">
      <h1 className="text-2xl mb-4">Welcome to the Trivia Challenge!</h1>
      <h2 className="text-xl mt-15 mb-4">You will be presented with 10 True or False questions.</h2>
      <h3 className="text-xl mt-15">Can you score 100%?</h3>

      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mt-5 border border-blue-500 hover:border-transparent rounded"
        onClick={() => navigate("/quiz")}>
        Begin
      </button>
    </div>
  );
}

export default Home;
