const intialState = {
	user: {},
	signUp: false,
	users: [],
	conversations: [],
	chat: {
		chats: [],
		friend: {},
		id: ''
	}
};

function rootReducer(state = intialState, action) {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				user: action.payload
			};
		case 'SIGNUP':
			return {
				...state,
				signUp: true
			};

		case 'REGISTERED':
			return {
				...state,
				signUp: false
			};
		case 'USERS_ALL':
			return {
				...state,
				users: action.payload
			};
		case 'CONVERSATIONS':
			return {
				...state,
				conversations: action.payload
			};
		case 'CHAT':
			return {
				...state,
				chat: action.payload
			};
		case 'CLEAR':
			return {
				...state,
				user: {},
				signUp: false,
				users: [],
				conversations: [],
				chat: {
					chats: [],
					friend: {},
					id: ''
				}
			};
		case 'PUSHCHAT':
			return{
				...state,
				chat: {
					...state.chat,
					chats: [...state.chat.chats, action.payload]
				},

			}
		default:
			return state;
	}
}

export default rootReducer;
