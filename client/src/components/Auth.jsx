import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);
    const [errorAlert, setErrorAlert] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password, phoneNumber, avatarURL } = form;

        const URL = 'https://technicaltestapp.herokuapp.com/auth';

        try{

        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        }).then((response) => {
            console.log(response);
                return response;
        }).catch((err) => {
                console.log(err);
                throw new Error(err)
        }) ;

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }
        
        window.location.reload();
    }catch(err){
        console.log(err);
        setErrorAlert(true);
    }
}

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Crear cuenta' : 'Iniciar sesión'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Nombre completo</label>
                                <input 
                                    name="fullName" 
                                    type="text"
                                    placeholder="Nombre completo"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Nombre de usuario</label>
                                <input 
                                    name="username" 
                                    type="text"
                                    placeholder="Nombre de usuario"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Numero telefónico</label>
                                <input 
                                    name="phoneNumber" 
                                    type="text"
                                    placeholder="Numero telefónico"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input 
                                    name="avatarURL" 
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Contraseña</label>
                                <input 
                                    name="password" 
                                    type="password"
                                    placeholder="Contraseña"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                                <input 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Confirmar contraseña"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            )}
                            {errorAlert && <div class="alert-danger" role="alert">Nombre de usuario o contraseña inválido</div>}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Crear cuenta" : "Iniciar sesión"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                             ? "¿Ya tienes una cuenta?" 
                             : "¿No tienes una cuenta?"
                             }
                             <span onClick={switchMode}>
                             {isSignup ? 'Iniciar sesión' : 'Crear cuenta'}
                             </span>
                        </p>
                    </div>
                </div> 
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in" />
            </div>
        </div>
    )
}

export default Auth
