import ListComponent from "./component/List";
import Conversation from "./component/Conversation";
import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { socket } from "../../socket";

const Message = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [isBack, setIsBack] = useState<boolean>(false);

  useEffect(() => {
    const handleError = (err: any) => {
      console.log(`connect_error due to ${err.message}`);
    };
  
    socket.auth = socket.auth || {};
    (socket.auth as any).token = localStorage.getItem("token");
    socket.connect();
    socket.on("connect_error", handleError);
  
    return () => {
      socket.off("connect_error", handleError); // <- cleanup
      socket.disconnect();
    };
  }, []);
  

  useEffect(() => {
    if (isMdUp) {
      setIsBack(false);
    }
  }, [isMdUp]);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {isMdUp ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "25%",
            borderRight: "1px solid #ddd",
            overflowY: "auto",
          }}
        >
          <ListComponent socket={socket}/>
        </div>
      ) : (
        isBack && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "100%",
              overflowY: "auto",
            }}
          >
            <ListComponent isBack={isBack} setIsBack={setIsBack} socket={socket} />
          </div>
        )
      )}

      {!isBack && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: isMdUp ? "75%" : "100%",
            overflowY: "hidden",
          }}
        >
          <Conversation setIsBack={setIsBack} socket={socket} />
        </div>
      )}
    </div>
  );
};

export default Message;
