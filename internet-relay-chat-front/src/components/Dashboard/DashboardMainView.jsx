import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import User from "../User/UserMainView";
import ChatBox from "../ChatBox/ChatBox";
import Chat from "../Chat/ChatMainView";
import styles from "./styles.module.scss";
import socketIOClient from "socket.io-client";
import { useHistory } from "react-router-dom";
import { ENDPOINTFORWS } from "../../services";
import { setMessageIntoChat } from "../ChatBox/Core/actions";
import { useDispatch } from "react-redux";

export default function DashboardMainView() {
  const socket = socketIOClient(ENDPOINTFORWS, { transports: ["websocket"], upgrade: false });
  const cookies = new Cookies();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!cookies.get("accessToken")) {
      history.push("/");
    }
    console.log("HERE!");
    socket.on("message", (data) => {
      dispatch(setMessageIntoChat(data));
    });

    return () => socket.disconnect();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <User />
        <ChatBox />
        <Chat />
      </div>
    </div>
  );
}
