import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import { getGifs } from "../repository/giphyRepository";
import GifImage from "./GifImage";
import { ResultGif } from "../repository/types";

interface Props {
  commandToShow: string;
  text: string;
  onSelect: (gif: ResultGif) => void | Promise<void>;
}

const GifBrowser: React.FC<Props> = (props) => {
  const [textToSearch, setTextToSearch] = React.useState("");
  const [gifs, setGifs] = React.useState<ResultGif[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const [command, ...text] = props.text.split(" ");

    if (command === props.commandToShow && text.length > 0) {
      setTextToSearch(text.join(" "));
    } else {
      if (textToSearch) {
        setTextToSearch("");
      }
    }
  }, [props.text]);

  useEffect(() => {
    let componentMounted = true;

    async function browseGifs() {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 700));

      if (componentMounted) {
        const response = (await getGifs(textToSearch)).data.data;

        if (componentMounted) {
          setGifs(response);
          setLoading(false);
        }
      }
    }

    if (textToSearch) browseGifs();

    return () => {
      componentMounted = false;
    };
  }, [textToSearch]);

  return textToSearch ? (
    <Box padding={2} height="500px" overflow="auto" bgcolor="white">
      {loading ? (
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {gifs.map((e, index) => (
            <Grid
              item
              md={3}
              key={`${index}-${e.title}`}
              onClick={() => props.onSelect(e)}
            >
              <GifImage src={e.images.original.url} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  ) : (
    <div></div>
  );
};

export default GifBrowser;
