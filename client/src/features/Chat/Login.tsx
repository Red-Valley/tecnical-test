import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { login } from "./chatSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); 
  const [nickName,setNickName] = useState('');
  const handleLogin=()=>{
    dispatch(login(nickName))    
    navigate("/chatRoom");    
  }
  const onChangeNickName=(event:ChangeEvent<HTMLInputElement>)=>
  {
        setNickName(event.target.value);        
  }

  return (
    <div className="text-center px-10">
      <h1 className="text-2xl mb-4">Login in Geek Chat is very simple!</h1>
      <h2 className="text-xl mt-15 mb-4">1. Select a avatar.</h2>
      <h2 className="text-xl mt-15 mb-4">2. Try a good nickname to join.</h2>
      <h2 className="text-xl mt-15 mb-4"> Click on the enter button.</h2>      
      <TextField onChange={onChangeNickName} type='text'></TextField>
      <Button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mt-5 border border-blue-500 hover:border-transparent rounded"
        onClick={handleLogin}>
        Enter
      </Button>
    </div>
  );
}

export default Login;
