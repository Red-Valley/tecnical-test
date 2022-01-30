import { useState } from "react";
import Login from "../../features/User/Login";
import SignIn from "../../features/User/SignIn";

function Home() {
  const [currentTab, setCurrentTab] = useState("Login");

  return (
    <div className="text-center px-10">
      <h1 className="text-3xl font-bold underline">Welcome to Geek Chat!</h1>
      <h2 className="text-xl mt-15 mb-4">
        The most particular chat in the internet.
      </h2>

      {currentTab == "Login" ? (
        <>
          <Login></Login>
          <div className="mt-4">
            Are you a new user?
            <a
              className="rounded-full cursor-pointer text-white bg-violet-500 ml-2  p-2 hover:bg-violet-700"
              onClick={() => setCurrentTab("SignIn")}
            >
              Register here!
            </a>
          </div>
        </>
      ) : (
        <>
          <SignIn></SignIn>
          <div className="mt-4">
            Have you remembered your nickname and password?
            <a
              className="rounded-full cursor-pointer text-white bg-violet-500 ml-2 mt-8 p-2 hover:bg-violet-700"
              onClick={() => setCurrentTab("Login")}
            >
              Login here!
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
