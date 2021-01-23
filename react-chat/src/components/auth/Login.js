import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';

import {loginWithEmail, signInWithGoogle} from '../firebase/firebase';


const Login = () => {

	const [alertaEmail, setAlertaEmail] = useState(false);
  	const [alertaPassword, setAlertaPassword] = useState(false);
	const [usuario, setUsuario] = useState({
		email: '',
		password: ''
    })
    const history = useHistory();

  	// Destructuring a usuario
	const {email, password} = usuario;

	const login = (e) => {
		setUsuario({
		...usuario,
		[e.target.name] : e.target.value
		})
	}

  	const onSubmit = (e) => {
		e.preventDefault();
		
		// Validar
		if(email.trim() === '') {
            setAlertaEmail(true)
            // return;
        };
        if(password.trim() === '') {
            setAlertaPassword(true);
            return;
        }
        
        loginWithEmail(email, password).then(
			history.push('/')
		)
	}

	return (
		<div className="contenedor-usuario">
			<div className="contenedor-formulario">
				<h6>Sign In with</h6>
				<div className="sign-container">
					<div className="redes" onClick={signInWithGoogle}><i className="fab fa-google"></i>Google</div>
				</div>
				<h6>Or use your email</h6>
				<form 
					onSubmit={onSubmit}
				>
					<div className="campo-formulario">
						{/* <label htmlFor="email">Email:</label> */}
						<input 
							type="email"
							id="email"
							placeholder="Your email"
							name="email"
							value={email}
							onChange={login}
						/>
					</div>
					{alertaEmail ? <p className="alerta-error">Este campo es obligatorio*</p> : null }
					<div className="campo-formulario">
						{/* <label htmlFor="password">Password:</label> */}
						<input 
							type="password"
							id="password"
							placeholder="your password"
							name="password"
							value={password}
							onChange={login}
						/>
					</div>
					{alertaPassword ? <p className="alerta-error">Este campo es obligatorio*</p> : null }
					<div className="campo-formulario">
						<input
							type="submit"
							className="btn1"
							value="Login"
						/>
					</div>
				</form>
				<div className="count">
					<p>Don't have an Account?</p>
					<Link to={'/new-account'} className="enlace-cuenta">
						Register
					</Link>
				</div>
			</div>
		</div>
	);
}
 
export default Login;
