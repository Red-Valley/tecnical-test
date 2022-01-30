import { GiphyFetch } from "@giphy/js-fetch-api";
import { MessageEntity } from "../../entities/message.entity";

export const REGEX_YOUTUBE: RegExp = /(?:\/youtube \w+\/\w+)/g;
export const REGEX_GIPHY: RegExp = /(?:\/giphy)/g;

export interface TextBoxState {
  message: string;
  status: "idle" | "sending" | "error";
  error: null;
}
const initialState = {
  message: "",
  status: "idle",
  error: null,
};

// const textBoxMessageSlice = createSlice({
//   name: "textBoxMessage",
//   initialState,
//   reducers: {
//     sendMessage: (state, action) => {},
//     messageSent: (state, action) => {},
//   },
// });

export default function textBoxMessageReducer(state = initialState, action:any) {
    switch (action.type) {

     case 'textBoxMessage/messageSent': {
      
      return action.payload;    }

      case 'textBoxMessage/sendMessage': {
        return action.payload;    }
  
    default:
      return state
  }
}

export function buildMessage(text:any) {
  return async function buildMessageThunk(dispatch:any, getState:any) {
    const state = getState().user;
    let message:MessageEntity = {id:null,body:text, nickName:state.currentUser.nickName, createdAt:new Date().toJSON()} ;
   if (REGEX_GIPHY.test(message.body)) {
     let matchs = message.body.match(REGEX_GIPHY);
     if (matchs) {
       const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");
       const response = await giphyFetch.random();
       console.log(response);
       let gif = `<img src="${response.data.images.fixed_height.url}" />`;
       message.body = message.body.replace(matchs[0], gif);
     }
   }  
    dispatch({ type: 'textBoxMessage/sendMessage', payload: message })
  }
}

  


