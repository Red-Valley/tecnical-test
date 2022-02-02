import { bake_cookie, delete_cookie, read_cookie } from 'sfcookies';
import axios from 'axios';

export const LOGIN = (form, navigate) => {
	return async (dispatch) => {
		try {
			const { data: { token, user } } = await axios.post(`${import.meta.env.VITE_DOMAIN}auth/login`, form);
			console.log('bake-cookie:', token)
			bake_cookie('userToken', token);
			dispatch({ type: 'LOGIN', payload: user });
			return navigate('/messenger');
		} catch (error) {
			const { response: { data: { signUp, message } } } = error;
			if (signUp) {
				navigate('/register');
				return dispatch({ type: 'SIGNUP' });
			}
			alert(message);
		}
	};
};

export const REGISTER = (form, navigate) => {
	return async (dispatch) => {
		try {
			const { data: { message } } = await axios.post(`${import.meta.env.VITE_DOMAIN}auth/register`, form);
			alert(message);
			navigate('/');
		} catch (error) {
			alert(error.response.data.message);
			navigate('/');
		}
		return dispatch({ type: 'REGISTERED' });
	};
};

export const USERS_ALL = () => {
	return async (dispatch) => {
		try {
			const {data: users} =await axios(`${import.meta.env.VITE_DOMAIN}users`, {headers:{token: read_cookie('userToken')}});
			return dispatch({type:'USERS_ALL', payload: users})
		} catch (error) {
			console.error(error)
		}
	};
};

export const CONVERSATIONS = ()=>{
	return async(dispatch)=>{
		try {
			const  { data } = await axios(`${import.meta.env.VITE_DOMAIN}conversation/`, {headers:{token: read_cookie('userToken')}})
			return dispatch({type:"CONVERSATIONS", payload: data})
		} catch (error) {
			console.error(error)
			alert('error')
		}
	}
}

export const CHAT = (conversationId, friend)=>{
	return async(dispatch)=>{
		try {
			const  { data } = await axios(`${import.meta.env.VITE_DOMAIN}message/${conversationId}`, {headers:{token: read_cookie('userToken')}})
			return dispatch({type:"CHAT", payload: {id:conversationId, friend, chats:data}})
		} catch (error) {
			console.error(error)
			alert('error')
		}
	}
}

export const NEW_MESSAGE = async (body)=>{
	
	try {
		 await axios.post(`${import.meta.env.VITE_DOMAIN}message/`, body, {headers:{token: read_cookie('userToken')}})
		return;
	} catch (error) {
		console.error(error)
		alert('error')
	}
}

export const CLEAR = ()=>{
    delete_cookie("userToken");
	return  (dispatch)=>{
		return dispatch({type:'CLEAR'})
	}
}

export const PUSHCHAT = (msg)=>({
	type:'PUSHCHAT',
	payload: msg
})