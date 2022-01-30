import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { signIn, checkAvailableNickName } from "../User/userSlice";

const AVATARS = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function SignIn() {
  const [nickName, setNickName] = useState("");
  const [hash, setHash] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [signInRequestStatus, setSignInRequestStatus] = useState('idle')

  const dispatch = useAppDispatch();

  const onChangeNickName = (event: ChangeEvent<HTMLInputElement>) => {
    
    setNickName(event.target.value);
  };
  const onChangeHash = (event: ChangeEvent<HTMLInputElement>) => {
    setHash(event.target.value);
  };
  const onChangeAvatar = (index: number) => {
    setAvatar(AVATARS[index]);
  };

  
  const canSave =
    [nickName, avatar, hash].every(Boolean) && signInRequestStatus === 'idle'

  const handleSignIn = async () => {
    if (canSave) {
      try {
        setSignInRequestStatus('pending')
        dispatch(signIn({ nickName:nickName, hash:hash}));
        setNickName('')
        setHash('')        
      } catch (err) {
        console.error('Failed to sign in: ', err)
      } finally {
        setSignInRequestStatus('idle')
      }
    }
  }


  return (
    <div className="flex flex-col">
      <div className="flex flex-col basis-1/2 justify-center">
      <span className="text-2xl mb-4">Register in Geek Chat is very simple!</span>
      <div className="w-auto flex flex-col">
      <span className="w-auto">1. Select a avatar.</span>
      <span className="w-auto">2. Try a good nickname to join.</span>
      <span className="w-auto">3. Click on the enter button.</span>
      </div>
      
      </div>
      
      <div className="flex flex-col">
        <div className="basis-1/4">
          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Avatar
            </span>
            <div className="flex flex-row justify-center">
              {AVATARS.map((item, index) => (
                <img
                  onClick={() => onChangeAvatar(index)}
                  key={index}
                  className={`h-10 w-10 rounded-full text-center cursor-pointer m-2 rounded-full ${
                    avatar === item
                      ? "border-solid border-2 border-indigo-600 w-12 h-12"
                      : ""
                  } `}
                  src={`assets/images/avatars/${item}`}
                  alt=""
                />
              ))}
            </div>
          </label>
        </div>
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
            className="basis-1/4 bg-blue-500 hover:bg-blue-600 font-semibold text-white  py-2 px-4 mt-5 border border-blue-500 hover:border-transparent rounded"
            onClick={handleSignIn}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
