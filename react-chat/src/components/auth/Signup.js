import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './Signup.css';

import {registerWithEmail} from '../firebase/firebase';

const Signup = () => {

	const [alertaNombre, setAlertaNombre] = useState(false);
	const [alertaEmail, setAlertaEmail] = useState(false);
	const [alertaPassword, setAlertaPassword] = useState(false);
	const [alertaConfirm, setAlertaConfirm] = useState(false);
	const [alertaLength, setAlertaLength] = useState(false);
	const [alertaEqual, setAlertaEqual] = useState(false);
	const [nuevousuario, setNuevoUsuario] = useState({
		nombre: '',
		email: '',
		password: '',
		comfirm: ''
	})
	const history = useHistory();

	// Destructuring a usuario
	const {nombre, email, password, comfirm} = nuevousuario;

	const iniciarSesion = (e) => {
		setNuevoUsuario({
			...nuevousuario,
			[e.target.name] : e.target.value
		})
	}

	const onSubmit = (e) => {
		e.preventDefault();
			
		// Validar
		if(nombre.trim() === '') {
            setAlertaNombre(true)
            // return;
        }
		if(email.trim() === '') {
            setAlertaEmail(true)
            // return;
        }
		if(password.trim() === '') {
            setAlertaPassword(true)
            // return;
        }
		if(comfirm.trim() === '') {
            setAlertaConfirm(true)
            return;
        }

		// Validar que el password minimo 6 caracteres
		if(password.length < 6 && password.trim() !== ''){
			setAlertaLength(true)
			setAlertaPassword(false)
			// return;
		}

		// Validar que los password sean iguales
		if(password !== comfirm){
			setAlertaEqual(true)
			setAlertaConfirm(false)
			return;
		}

		registerWithEmail(nombre, email, password).then(
            history.push('/login')
		)

	}

	return (
		<div className="contenedor-usuario">
			<div className="contenedor-formulario sombra-dark">
				<h6>Create Account</h6>
				<form 
					onSubmit={onSubmit}
				>
					<div className="campo-formulario">
                        <input 
                            type="text"
                            id="nombre"
                            placeholder="Your Name"
                            name="nombre"
                            value={nombre}
                            onChange={iniciarSesion}
                        />
					</div>
					{alertaNombre ? <p className="alerta-error">Este campo es obligatorio*</p> : null }
					<div className="campo-formulario">
                        <input 
                            type="email"
                            id="email"
                            placeholder="Your email"
                            name="email"
                            value={email}
                            onChange={iniciarSesion}
                        />
					</div>
					{alertaEmail ? <p className="alerta-error">Este campo es obligatorio*</p> : null }
					<div className="campo-formulario">
                        <input 
                            type="password"
                            id="password"
                            placeholder="New Password"
                            name="password"
                            value={password}
                            onChange={iniciarSesion}
                        />
					</div>
					{alertaPassword ? <p className="alerta-error">Este campo es obligatorio*</p> : null }
					{alertaLength ? <p className="alerta-error">El password debe ser minimo 6 caracteres</p> : null }
					<div className="campo-formulario">
                        <input 
                            type="password"
                            id="comfirm"
                            placeholder="Rewrite Your Password"
                            name="comfirm"
                            value={comfirm}
                            onChange={iniciarSesion}
                        />
					</div>
					{alertaConfirm ? <p className="alerta-error">Este campo es obligatorio*</p> : null }
					{alertaEqual ? <p className="alerta-error">Los password deben ser iguales</p> : null }
					<div className="campo-formulario">
						<input
							type="submit"
							className="btn1"
							value="Register"
						/>
					</div>
					</form>
					<div className="count">
						<p>Already have the account?</p>
						<Link to={'/login'} className="enlace-cuenta">
							Login
						</Link>
					</div>
			</div>
		</div>
	);
}
 
export default Signup;
