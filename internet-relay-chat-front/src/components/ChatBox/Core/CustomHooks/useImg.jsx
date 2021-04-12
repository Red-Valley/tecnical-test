import { useEffect, useState } from "react";
import { callGiphy } from "../../../../services";

export default function useImg(message) {
  const [parseMessage, setParseMessage] = useState(message);

  const parseAll = async () => {
    const response = await callGiphy(message);
    setParseMessage(response.data.data[0].images.downsized.url);
  };

  useEffect(() => {
    parseAll();
  }, [message]);

  return { parseMessage };
}
