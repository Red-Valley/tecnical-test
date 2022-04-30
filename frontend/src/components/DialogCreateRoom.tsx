import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";

import Button from "./Button";
import { createChatRoom } from '../repository/redValleyRepository';

interface Props {
  open: boolean
  onClose: () => void;
  onSuccess: () => void | Promise<void>; 
}

const DialogCreateRoom: React.FC<Props> = (props) => {
  const componentMounted = React.useRef(true);
  const [loading, setLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>();

  async function handleCreateRoom() {
    const inputValue = inputRef.current!.value;

    if (inputValue) {
      setLoading(true);
      await createChatRoom({name: inputValue});
  
      if (componentMounted.current) {
        setLoading(false);
        await props.onSuccess();
      }
    }
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="sm">
        <DialogContent>
          <TextField
            inputRef={inputRef}
            autoFocus
            margin="dense"
            label="Nombre"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancelar</Button>
          <Button 
            loading={loading} 
            onClick={handleCreateRoom}
            disabled={loading}
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogCreateRoom;
