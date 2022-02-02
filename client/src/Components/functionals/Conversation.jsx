import { Container } from "@mui/material";
import Chat from "./Chat";
import TypeBox from "./TypeBox";

const Conversation = ({socket}) => {
  
  return(
      <Container>
          <Chat socket={socket} />
          <TypeBox socket={socket} />
      </Container>
  );
};

export default Conversation;
