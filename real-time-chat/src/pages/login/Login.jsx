import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { PaperAirplaneIcon } from '@heroicons/react/outline';
import Cookies from 'universal-cookie';
import runtimeEnv from '@mars/heroku-js-runtime-env';

export default function Login() {
    const env = runtimeEnv();
    const [mode, setMode] = useState('login');
    //referencias DOM
    const userRef = useRef();
    const passwordRef = useRef();
    const nickRef = useRef();
    const userToRegRef = useRef();
    const nameToRegRef = useRef();
    const nickToRegRef = useRef();
    const passwordToRegRef = useRef();
    const urlServer = env.REACT_APP_URL_SERVER;
    const MySwal = withReactContent(Swal);
    const cookies = new Cookies();
    const navigate = useNavigate();
    useEffect(() => {
        if (cookies.get('username')) {
            navigate("/chat-room", { replace: true });
        }
    });
    const changeMode = () => {
        mode == 'login' ? setMode('register') : setMode('login');
    }
    const login = async (event) => {
        event.preventDefault();
        if (!userRef.current.value || !passwordRef.current.value) {
            return MySwal.fire('ERROR', 'Datos incompletos', 'warning');
        }
        try {
            await axios.post(`${urlServer}/api/v1/login`, { user: userRef.current.value, password: passwordRef.current.value })
                .then(data => (data))
                .then(data => {
                    if (data.status == 200) {
                        const payload = data.data.userData;
                        cookies.set('idUser', payload._id, { path: '/' });
                        cookies.set('username', payload.username, { path: '/' });
                        cookies.set('name', payload.fullName, { path: '/' });
                        cookies.set('nickname', (nickRef.current.value !== '' ? nickRef.current.value : payload.nickname), { path: '/' });
                        //navigate("/chat-room", { replace: true });
                        window.location.assign("/chat-room");
                    }
                })
        } catch (error) {
            MySwal.fire('ERROR', 'Por Favor verifique sus credenciales', 'error');
        }

    }

    const register = async (event) => {
        event.preventDefault();
        if (userToRegRef.current.value == '' || nameToRegRef.current.value == '' || nickToRegRef.current.value == '' || passwordToRegRef.current.value == '') {
            return MySwal.fire('ERROR', 'Datos incompletos', 'warning');
        }
        const dataToSend = {
            username: userToRegRef.current.value,
            password: passwordToRegRef.current.value,
            fullName: nameToRegRef.current.value,
            nickname: nickToRegRef.current.value
        }
        try {
            await axios.post(`${urlServer}/api/v1/users`, dataToSend)
                .then(data => data)
                .then(data => {
                    if (data.status == 200) {
                        const payload = data.data.userData;
                        cookies.set('idUser', payload._id, { path: '/' });
                        cookies.set('username', payload.username, { path: '/' });
                        cookies.set('name', payload.fullName, { path: '/' });
                        cookies.set('nickname', payload.nickname, { path: '/' });
                        navigate("/chat-room", { replace: true });
                    }
                });
        } catch (error) {
            MySwal.fire('ERROR', 'Por favor complete los datos', 'error');
        }
    }
    return (
        <div className="content-primary flex w-full h-full item-center justify-end bg-indigo-300">
            <div className="login flex bg-gray-200/70 w-full lg:w-2/5 justify-center items-center">
                {mode == 'login' ? (
                    <div className="w-4/5">
                        <form className="w-full" onSubmit={login}>
                            <div className="icono-login flex justify-center items-center py-4">
                                <h1 className="text-emerald-400 font-bold text-4xl">MyChat</h1>
                                <PaperAirplaneIcon className="h-12 w-12 text-indigo-500  transform rotate-45 relative -top-4" />
                            </div>
                            <div className="block w-full my-2">
                                <input type="text" ref={userRef} className="rounded-sm w-full px-2 h-12 focus:outline-none text-gray-700 focus:ring focus:ring-indigo-400" placeholder="Usuario" />
                            </div>
                            <div className="block w-full my-2">
                                <input type="password" ref={passwordRef} className="rounded-sm w-full px-2 h-12 focus:outline-none text-gray-700 focus:ring focus:ring-indigo-400" placeholder="Contraseña" />
                            </div>
                            <div className="block w-full my-2">
                                <input type="text" ref={nickRef} className="rounded-sm w-full px-2 h-12 focus:outline-none text-gray-700 focus:ring focus:ring-indigo-400" placeholder="Nick | Apodo" />
                                <h3 className="text-gray-400 text-justify text-md bg-white/30 p-2 rounded-b-lg">Campo Nick No Obligatorio, Si No Lo Ingresa Se Tomara El Que Tiene Registrado Por Defecto.</h3>
                            </div>
                            <div className="flex justify-center w-full my-4">
                                <button type="submit" className="bg-green-400 rounded py-4 px-12 font-bold text-white">Iniciar Sesion</button>
                            </div>

                        </form>
                        <div className="flex items-center justify-center mt-5 p-4">
                            <button onClick={changeMode} className="text-indigo-600 underline hover:scale-110 transition duration-500">Crear Cuenta</button>
                        </div>
                    </div>
                ) : (
                    <div className="w-4/5">
                        <form className="w-full" onSubmit={register}>
                            <div className="icono-login flex justify-center items-center py-4">
                                <h1 className="text-emerald-400 font-bold text-4xl">MyChat</h1>
                                <PaperAirplaneIcon className="h-12 w-12 text-indigo-500  transform rotate-45 relative -top-4" />
                            </div>
                            <div className="block w-full my-2">
                                <input type="text" ref={userToRegRef} className="rounded-sm w-full px-2 h-12 focus:outline-none text-gray-700 focus:ring focus:ring-indigo-400" placeholder="Usuario" />
                            </div>
                            <div className="block w-full my-2">
                                <input type="text" ref={nameToRegRef} className="rounded-sm w-full px-2 h-12 focus:outline-none text-gray-700 focus:ring focus:ring-indigo-400" placeholder="Nombre Completo" />
                            </div>
                            <div className="block w-full my-2">
                                <input type="text" ref={nickToRegRef} className="rounded-sm w-full px-2 h-12 focus:outline-none text-gray-700 focus:ring focus:ring-indigo-400" placeholder="Nick | Apodo" />
                            </div>
                            <div className="block w-full my-2">
                                <input type="password" ref={passwordToRegRef} className="rounded-sm w-full px-2 h-12 focus:outline-none text-gray-700 focus:ring focus:ring-indigo-400" placeholder="Contraseña Nueva" />
                            </div>
                            <div className="flex justify-center my-4 gap-2 w-[90]">
                                <button type="submit" className="bg-green-400 rounded py-4 px-12 w-1/2 font-bold text-white">Registrarte</button>
                                <button type="submit" className="bg-gray-400 rounded py-4 px-12 w-1/2 font-bold text-white" onClick={changeMode}>Cancelar</button>
                            </div>

                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}
