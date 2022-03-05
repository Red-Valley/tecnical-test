import { RootState } from "@reducers";
import {
  connectoRoomAction,
  listMessagesRequest,
  sendMessage,
} from "actions/chatRoomActions";
import { logoutAction } from "actions/userActions";
import { RefObject, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useChatRoom = (messagesEndRef: RefObject<HTMLLIElement>) => {
  const dispatch = useDispatch();
  const { messages, page }: ChatRoomState = useSelector(
    (state: RootState) => state.chatRoom
  );
  const { user }: UserState = useSelector((state: RootState) => state.user);

  const [initialScroll, setInitialScroll] = useState(true);

  useEffect(() => {
    dispatch(connectoRoomAction(user?.token || ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleLoadMore = () => {
    dispatch(listMessagesRequest({ page, token: user?.token || "" }));
  };

  const handleSubmit = (content: string) => {
    dispatch(
      sendMessage({
        content,
        user_id: user?.id || "",
      })
    );
  };

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return {
    messages,
    user,
    handleLoadMore,
    handleSubmit,
    handleLogout,
    scrollToBottom,
  };
};

export default useChatRoom;
