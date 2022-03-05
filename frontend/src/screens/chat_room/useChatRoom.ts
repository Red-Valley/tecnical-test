import { RootState } from "@reducers";
import { listMessagesRequest, sendMessage } from "actions/chatRoomActions";
import { RefObject, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useChatRoom = (messagesEndRef: RefObject<HTMLLIElement>) => {
  const dispatch = useDispatch();
  const { messages, page }: ChatRoomState = useSelector(
    (state: RootState) => state.chatRoom
  );
  const { user }: UserState = useSelector((state: RootState) => state.user);

  const [initialScroll, setInitialScroll] = useState(true);

  const handleLoadMore = () => {
    dispatch(listMessagesRequest({ page }));
  };

  const scrollToBottom = useCallback((elRef: RefObject<HTMLLIElement>) => {
    if (elRef.current) {
      elRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, []);

  useEffect(() => {
    if (messages?.length && initialScroll) {
      scrollToBottom(messagesEndRef);
      setInitialScroll(false);
    }
  }, [messages, initialScroll, scrollToBottom, messagesEndRef]);

  const handleSubmit = (content: string) => {
    dispatch(
      sendMessage({
        content,
        user_id: user?.id || "",
      })
    );
  };

  return {
    messages,
    user,
    handleLoadMore,
    handleSubmit,
    scrollToBottom
  };
};

export default useChatRoom;
