import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { globalStyles } from "utils/styles";
import { styles } from "./styles";

interface MessageCardProps {
  owner: boolean;
  message: IMessage;
}

const MessageCard = ({
  owner,
  message: { user, content, command, createdAt },
}: MessageCardProps) => {
  return (
    <ListItem alignItems="flex-start">
      {!owner && (
        <ListItemAvatar>
          <Avatar alt={user.username} src={user.photo} />
        </ListItemAvatar>
      )}
      <Paper sx={{...globalStyles.fullWidth, ...styles.messageCardPaper}}>
        <ListItemText
          primary={user.username}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                color="text.primary"
              >
                {content}
              </Typography>
              {createdAt && (
                <span style={styles.messageCardDate}>
                  {new Date(createdAt).toDateString()}
                </span>
              )}
            </>
          }
        />
      </Paper>
    </ListItem>
  );
};

export default MessageCard;
