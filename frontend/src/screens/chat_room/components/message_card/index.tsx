import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useI18n } from "hooks/useI18n";
import { globalStyles } from "utils/styles";
import { GiphyGif, styles } from "./styles";

interface MessageCardProps {
  owner: boolean;
  message: IMessage;
}

const MessageCard = ({
  owner,
  message: { user, content, command, createdAt },
}: MessageCardProps) => {
  const { messages: langMessages, locale } = useI18n();
  const { chat_room } = langMessages[locale];

  const renderUsername = () => (owner ? chat_room.message_card.user : user.username);
  const renderMsgDate = () => (
    <span
      style={{
        ...styles.messageCardDate,
        ...getTextColor(),
      }}
    >
      {new Date(createdAt).toDateString()}
    </span>
  );

  const getTextColor = () => (owner ? styles.messageOwnerText : {});
  return (
    <ListItem sx={{ justifyContent: owner ? "flex-end" : "flex-start" }}>
      {!owner && (
        <ListItemAvatar>
          <Avatar alt={user.username} src={user.photo} />
        </ListItemAvatar>
      )}
      <Paper
        sx={{
          ...globalStyles.midWidth,
          ...styles.messageCardPaper,
          ...styles[`message${owner ? "Owner" : "NoOwner"}`],
        }}
      >
        {command ? (
          <>
            <Typography
              component="div"
              variant="body2"
              sx={() => getTextColor()}
            >
              {renderUsername()}
            </Typography>
            <GiphyGif src={content} alt="message gif" />
            {createdAt && renderMsgDate()}
          </>
        ) : (
          <ListItemText
            sx={owner ? styles.messageOwnerText : {}}
            primary={renderUsername()}
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  sx={() => getTextColor()}
                >
                  {content}
                </Typography>
                {createdAt && renderMsgDate()}
              </>
            }
          />
        )}
      </Paper>
    </ListItem>
  );
};

export default MessageCard;
