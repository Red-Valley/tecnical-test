import _ from "lodash";
import moment from "moment";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callService } from "../../../../services";
import { useSnackbar } from "notistack";
import { setMessageHistory } from "../actions";
import Cookies from "universal-cookie";
import service from "../../../../routes/service";

export default function useChatBox() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { messages } = useSelector((state) => state.messages);

  const syncMessages = async () => {
    try {
      const messagesArr = await callService(
        `${service.messagesAll}/${cookies.get("nickname")}`,
        "GET"
      );
      const msgs = _.sortBy(messagesArr.data, (msg) =>
        moment(msg.date, "HH:MM - DD/MM/YYYY")
      );
      dispatch(setMessageHistory(msgs));
    } catch (error) {
      throw enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  useEffect(() => {
    syncMessages();
  }, []);

  return { messages, currentNickname: cookies.get("nickname") };
}
