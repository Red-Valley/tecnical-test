import moment from "moment";
import Cookies from "universal-cookie";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { setWroteMessage, cleanMessage } from "../actions";
import { callService } from "../../../../services";
import service from "../../../../routes/service";

export default function useChatActions() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { message } = useSelector((state) => state.messageMaker);

  const onWriteMessage = (e) => {
    const message = e.target.value;
    const nickname = cookies.get("nickname");
    dispatch(setWroteMessage({ nickname, message }));
  };
  const onSendMessage = async () => {
    if (!message.message) {
      throw enqueueSnackbar("Message can't be empty", { variant: "error" });
    } else {
      const date = `${moment().format("HH:mm")} - ${moment().format("DD/MM/YYYY")}`;
      console.log(date);
      await callService(service.sendMessage, "POST", { ...message, date });
      dispatch(cleanMessage());
    }
  };

  return { onWriteMessage, onSendMessage, message };
}
