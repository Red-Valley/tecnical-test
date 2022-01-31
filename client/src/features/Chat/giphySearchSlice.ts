


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { GiphyFetch } from "@giphy/js-fetch-api";

<<<<<<< HEAD
import axios from "axios";
import { Action } from "history";

=======
>>>>>>> dev

export const REGEX_GIPHY: RegExp = /(?:\/giphy)/g;

export enum GiphySearchStateStatuses {
  idle, 
  active,
  loading,
  data,  
  noData,
  failed,
  error 
}

export interface GiphySearchState {
  gifs :[],
  status: GiphySearchStateStatuses;
  error: string | null | undefined;
}
const initialState: GiphySearchState = {
  gifs:[],
  status: GiphySearchStateStatuses.idle,
  error: null,
};

const giphySearchSlice = createSlice({
  name: "giphySearch",
  initialState,
  reducers: {
    loading:(state,action)=>{
            state.status = GiphySearchStateStatuses.loading;       
    },   
    setGifs:(state,action)=>{ 
    if(action.payload)
      {
        state.status = GiphySearchStateStatuses.data;   
        state.gifs = action.payload;
        
      }else{
      
        state.status = GiphySearchStateStatuses.noData; 
        state.gifs = [];
        
      }      
    },
   
    failed: (state,action) =>{
      state.status = GiphySearchStateStatuses.noData;
      state.gifs = [];
      state.error = action.payload;
    }, 
   },
});


export function searchGiphys(search: string) {
  return async function searchGiphysThunk(dispatch: any, getState: any) {
    try {
      console.log(search);
      const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");   
      dispatch(loading(true));   
      const { data: gifs } = await giphyFetch.search(search, { sort: 'relevant', limit: 10, type: 'gifs' })
      dispatch(setGifs(gifs));
    } catch (error) {
      dispatch(failed(error));
    }
  };
}



export const {loading, failed, setGifs } = giphySearchSlice.actions;

export const selectGiphySearchStatus = (state: RootState) => state.giphySearch.status;
export const selectGiphyGifs = (state: RootState) => state.giphySearch.gifs;

export default giphySearchSlice.reducer;
