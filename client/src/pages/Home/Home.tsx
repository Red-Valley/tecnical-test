import { useState } from "react";
import GiphySearch from "../../features/Chat/GiphySearch";
import Login from "../../features/Home/Login";
import SignIn from "../../features/Home/SignIn";

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
     
          <SignIn onBack={() => setCurrentTab("Login")} ></SignIn>
    
     
      )}  
    </div>
  );
}

export default Home;
