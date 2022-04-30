import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface Props {
  src: string;
}

const GifImage: React.FC<Props> = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [src, setSrc] = React.useState("");

  React.useEffect(() => {
    let componentMounted = true;

    async function fetchImage() {
      const response = await fetch(props.src);
      const blob = await response.blob();

      if (componentMounted) {
        const url = URL.createObjectURL(blob);
        setSrc(url);
        setLoading(false);
      }
    }

    fetchImage();
    return () => {
      componentMounted = false;
    };
  }, []);

  return loading ? (
    <Box
      height="150px"
      width="100%"
      justifyContent="center"
      alignItems="center"
      display="flex"
    >
      <CircularProgress />
    </Box>
  ) : (
    <img src={src} height="150px" width="100%"/>
  );
};

export default GifImage;
