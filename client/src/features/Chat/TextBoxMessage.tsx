import { ChangeEvent, MouseEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import GiphySearch from "./GiphySearch";
import { REGEX_GIPHY } from "./giphySearchSlice";
import {
  buildMessage,
  selectTextBoxMessageStatus,
  TextBoxStateStatuses,
} from "./textBoxMessageSlice";

export default function TextBoxMessage() {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const [showGiphySearch, setShowGiphySearch] = useState(false);

  const handleSendMessage = async (event: MouseEvent<HTMLButtonElement>) => {
    try {
      if (message) {
        dispatch<any>(buildMessage(message));
        setMessage("");
      }
    } catch (err) {
      console.error("Failed to save the post: ", err);
    } finally {
    }
  };

  const handleChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    searchCommands(event.target.value);
  };

  const searchCommands = (message: string) => {
    if (REGEX_GIPHY.test(message)) {
      let res = message.match(REGEX_GIPHY);
      if (res) {  
        setMessage(message.replace("/giphy", ""))
        setShowGiphySearch(true);
      } else {
        setShowGiphySearch(false);
      }
    }
  };

  const handleSelectedGif = async (gif: any) => {
    let newMessage = `${message} <img src="${gif.images.fixed_height.url}" />`;
    await dispatch<any>(buildMessage(newMessage));
     setShowGiphySearch(false);
    setMessage("");
  };

  const canSend = [message].every(Boolean);

  return (
    <div className="flex flex-col p-5">
      <div>
        {showGiphySearch ? (
          <GiphySearch
            suggest={message}
            onSelected={(gif: any) => handleSelectedGif(gif)}
            handleBack={() => setShowGiphySearch(false)}
          ></GiphySearch>
        ) : (
          <div className="flex flex-row bg-white">
            <div className="w-full mr-4">
              <textarea
                rows={2}
                maxLength={500}
                className="w-full resize-none border-2  rounded p-2 mr-2"
                onChange={handleChangeMessage}
                value={message}
              ></textarea>
            </div>
            <div>
              <button
                 className="bg-blue-500 disabled:cursor-not-allowed disabled:opacity-75 hover:bg-blue-600 font-semibold text-white  py-2 px-4 mt-5 border border-blue-500 hover:border-transparent rounded"
                 onClick={handleSendMessage}
                 disabled={!canSend}
                 >
                Send
              </button>
            </div>
          </div>
        )}

        <div />
      </div>
    </div>
  );
}
