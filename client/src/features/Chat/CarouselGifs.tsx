import React, { useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Carousel } from "@giphy/react-components";
import { ImageList, ImageListItem } from "@mui/material";

interface CarouselGifsProps {
  gifs: [];
  onSelectedGif:Function
}



export default function CarouselGifs({ gifs, onSelectedGif }: CarouselGifsProps) {
  let componentGrid: any = <></>;
  if (gifs) {
    componentGrid = gifs.map((gif: any, index:number) => (
        <ImageListItem className={`cursor-pointer`} onClick={()=>onSelectedGif(gif)} key={index}>
      <img
        src={`${gif.images.fixed_height.url}?w=164&h=164&fit=crop&auto=format`}
        srcSet={`${gif.images.fixed_height.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        alt={gif.title}
        loading="lazy"
      />
    </ImageListItem>    
    ));
  }


return (<ImageList cols={4} rowHeight={164}>
  {componentGrid}
</ImageList>);

}
