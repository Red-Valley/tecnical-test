import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { tryLogin, selectLoginStatus, LoginStateStatuses } from "../Home/loginSlice";


function Login() {
  
  const dispatch = useAppDispatch();  
  const navigate = useNavigate();

  const loginStatus = useAppSelector(selectLoginStatus);
  const [nickName, setNickName] = useState("");
  const [hash, setHash] = useState("");
  const [loginRequestStatus, setLoginRequestStatus] = useState(LoginStateStatuses.idle)
  

  useEffect(() => {
    console.log(loginStatus);
    if(loginStatus==LoginStateStatuses.success)
    {           
      navigate("/chatRoom");
    }
   
  }, [loginStatus]);







  const onChangeNickName = (event: ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value);
  };
  const onChangeHash = (event: ChangeEvent<HTMLInputElement>) => {
    setHash(event.target.value);
  };

  
  const canLogin =
    [nickName, hash].every(Boolean) && loginRequestStatus === LoginStateStatuses.idle

  const handleLogin = async () => {
    if (canLogin) {
      try {
        setLoginRequestStatus(LoginStateStatuses.loading);
        dispatch<any>(tryLogin({ nickName:nickName, hash:hash}));
        setNickName('')
        setHash('')                    
      } catch (err) {
        console.error('Failed to login: ', err)
        setLoginRequestStatus(LoginStateStatuses.failed);
      } finally {
        setLoginRequestStatus(LoginStateStatuses.idle);
      }
    }
  }


  return (
    <div className="flex flex-col">
      <div className="flex flex-col basis-1/2 justify-center">
      <span className="text-2xl mb-4">Enter your nickname and password to enter!</span>
           
      </div>
      
      <div className="flex flex-col">
      
        <div className="basis-1/4">
          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Nickname
            </span>
            <input
              type="text"
              name="nickName"
              onChange={onChangeNickName}
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md"
              value={nickName}
            />
          </label>
        </div>
        <div className="basis-1/4">
          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Password
            </span>
            <input
              type="password"
              name="hash"
              onChange={onChangeHash}
              value={hash}
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md"
              
            />
          </label>
        </div>
        <div className="basis-1/4">
          <button
            className="bg-blue-500 disabled:cursor-not-allowed disabled:opacity-75 hover:bg-blue-600 font-semibold text-white  py-2 px-4 mt-5 border border-blue-500 hover:border-transparent rounded"
            onClick={handleLogin}
            disabled={!canLogin}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
