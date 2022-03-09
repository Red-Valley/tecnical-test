import { useRef, useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../actions';

function AddMessage() {
    const [botOn, setbotOn] = useState(false);
    let fetchGifs='';
    const dispatch = useDispatch();
    const messageRef = useRef();
    const sendMessage = async (event) => {
        event.preventDefault();
        if (messageRef.current.value !== '') {
            dispatch(addMessage(messageRef.current.value, 'Me'));
            messageRef.current.value = '';
        }
    }
    const checkbot = async (event) => {
        event.preventDefault();
        const message = (messageRef.current.value).toLowerCase();
        if (message.startsWith('/giphy ')) {
            setbotOn(true);
        }else{
            setbotOn(false);
        }
    }
    return (
        <>
            {botOn == true &&
                <div className="flex justify-center">
                    <h3 className=" w-4/5 text-gray-700">Hemos detectado que deseas buscar un Gif, esta funcionalidad aun esta en desarrollo, agredezco su comprension :D</h3>
                </div>
            }
            <div className="send-bar flex bg-gray-200 h-[10%] w-full items-center justify-between">
                <div className="hidden lg:flex lg:w-1/6"></div>

                <form className="message-box flex w-full lg:w-5/6 h-full px-2 items-center justify-center" onSubmit={sendMessage}>
                    <input className="h-5/6 w-[90%] rounded-lg px-3 text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300" placeholder="Escribe un mensaje aquí" ref={messageRef} onChange={checkbot}></input>
                    <div className="flex w-[10%] item-center justify-center">
                        <button><PaperAirplaneIcon className="h-6 w-6 text-indigo-500 transform rotate-90 lg:hover:rotate-45 lg:hover:r-translate-y-2 lg:hover:translate-x-2 transition duration-500" /></button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default AddMessage;