import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Header from '../../components/Header'
import Users from './Users';
import MessageList from './MessageList'
import AddMessage from './AddMessage';



export default function Chat() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!cookies.get('username')){
      navigate('/',{replace:true});
    }
  })
  return (
    <>
      <Header />
      <div className="chat flex h-[90%] w-full">
        <aside className="left h-full w-[25%] md:w-2/6 bg-white">
          <Users />
        </aside>
        <section className="right h-full w-[75%] md:w-4/6">
          <MessageList />
          <AddMessage />
        </section>
      </div>
    </>
  )
}
