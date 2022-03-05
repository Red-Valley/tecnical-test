import { Box, Dialog, DialogTitle } from "@mui/material";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import { GIPHY_KEY } from "utils/constants";

const giphyFetch = new GiphyFetch(GIPHY_KEY || "");

const GiphyDialog = ({ search, open, onClose }: GiphyDialogProps) => {
  const fetchGifs = (offset: number, limit = 10) => {
    if (search) {
      return giphyFetch.search(search, { offset, limit });
    }
    return giphyFetch.trending({ offset, limit });
  };
  const handleGifClick = (gif: any, e: any) => {
    e && e.preventDefault();
    onClose(gif.images.original.url);
  };
  return (
    <Dialog onClose={() => onClose("")} open={open}>
      <DialogTitle>Via GIPHY</DialogTitle>
      <Box component="div" sx={{ p: 1 }}>
        <Grid
          onGifClick={handleGifClick}
          fetchGifs={fetchGifs}
          width={300}
          columns={3}
          gutter={6}
        />
      </Box>
    </Dialog>
  );
};

export default GiphyDialog;
