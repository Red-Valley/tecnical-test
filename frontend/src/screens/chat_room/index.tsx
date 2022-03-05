import MessageCard from "./components/message_card";
import { List, Box } from "@mui/material";
import { useRef } from "react";
import { PageContainer } from "styled_components";
import { styles } from "./styles";
import { useInfiniteScroll } from "hooks/useInfiniteScroll";
import ChatHeader from "./components/chat_header";
import ChatFooter from "./components/chat_footer";
import useChatRoom from "./useChatRoom";
import GiphyDialog from "components/giphy_dialog";

const ChatRoomPage = () => {
  const messagesEndRef = useRef<HTMLLIElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    user,
    messages,
    commandSearchTerm,
    handleDialogOpen,
    handleDialogClose,
    handleLoadMore,
    handleSubmit,
    handleLogout,
  } = useChatRoom(messagesEndRef);

  useInfiniteScroll({
    elementRef: scrollRef,
    onLoadMore: () => handleLoadMore(),
    loadOnMount: true,
    hasMoreData: true,
  });

  return (
    <PageContainer>
      <ChatHeader user={user} onLogout={handleLogout} />
      <Box ref={scrollRef} component="div" sx={styles.messageListWrapper}>
        <List sx={styles.messageList}>
          <li ref={messagesEndRef} />
          {messages &&
            messages.map((message, index) => (
              <MessageCard
                key={`message_${index}`}
                owner={user?.id === message.user.id}
                message={message}
              />
            ))}
        </List>
      </Box>
      <ChatFooter onSubmit={handleSubmit} onOpenGifDialog={handleDialogOpen} />
      <GiphyDialog search={commandSearchTerm || ""} open={typeof commandSearchTerm === "string"} onClose={handleDialogClose} />
    </PageContainer>
  );
};

export default ChatRoomPage;
