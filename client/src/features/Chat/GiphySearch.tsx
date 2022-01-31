import React, { ChangeEvent, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  GiphySearchStateStatuses,
  searchGiphys,
  selectGiphyGifs,
  selectGiphySearchStatus,
} from "./giphySearchSlice";
import CarouselGifs from "./CarouselGifs";
import useDebounce from "../../hooks/useDebounce";
import { loading } from "./userSlice";

interface GiphySearchProps {
  onSelected: Function;
  handleBack: Function;
  suggest: string;
}

export default function GiphySearch({
  suggest,
  onSelected,
  handleBack,
}: GiphySearchProps) {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState(suggest);
  let gifsFounded = useAppSelector(selectGiphyGifs);
  let searchStatus = useAppSelector(selectGiphySearchStatus);

useEffect(()=>{
  if(searchText)
  {
    dispatch<any>(searchGiphys(searchText));
  }
  
},[])


  const handleChangeSearchText = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
    dispatch<any>(searchGiphys(searchText));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
     
          <a
            onClick={() => handleBack()}
            className="cursor-pointer justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-sky-700 bg-sky-100 hover:bg-sky-200 md:py-4 md:text-lg md:px-10"
          >
            Back
          </a>
    
          <input
            type="text"
            className="w-full resize-none border-2  rounded p-2 mr-2"
            value={searchText}
            onChange={handleChangeSearchText}
          />
       
      </div>

      {searchStatus == GiphySearchStateStatuses.data ? (
        <CarouselGifs
          onSelectedGif={(gif: any) => onSelected(gif)}
          gifs={gifsFounded}
        ></CarouselGifs>
      ) : (
        <></>
      )}
    </div>
  );
}
