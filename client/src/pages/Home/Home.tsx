import { useNavigate } from "react-router-dom";
import Login from "../../features/Chat/Login";

function Home() {

  return (
    <div className="text-center px-10">
          <h1 className="text-2xl mb-4">Welcome to Geek Chat!</h1>
      <h2 className="text-xl mt-15 mb-4">The most particular chat in the internet.</h2>
      <h3 className="text-xl mt-15">Do not require register to join</h3>
        <Login></Login>
    </div>
  );
}

export default Home;
