import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { Box, Typography, Input, Paper, List, ListItem, ListItemText } from "@mui/material";
import { useEntity } from "../../../context/EntityContext";
import { useUserContext } from "../../../context/UserContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import fetchApi from "../../../utils/fetchApi";
import { useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from 'react-i18next';

type User = {
  id: number;
  email: string;
  avatar?: string;
};

type Message = {
  id?: number;
  content?: string;
  createAt?: string;
  roomId: number;
  user: User;
};

type UserRoom = {
  id: number;
  userId: number;
  roomId: number;
};

type Room = {
  id: number;
  type: string;
  name?: string;
  userRooms: UserRoom[];
  messages: Message[];
};

type ConversationComponentProps = {
  setIsBack?: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket;
};

const Conversation: React.FC<ConversationComponentProps> = ({ setIsBack, socket }) => {
  const { t } = useTranslation();
  const navigate                        = useNavigate();
  const theme                           = useTheme();
  const isMdUp                          = useMediaQuery(theme.breakpoints.up("md"));
  const { user }                        = useUserContext();
  const { selectedEntityId }            = useEntity();
  const [ room, setRoom ]               = useState<Room | null>(null);
  const [ inputValue, setInputValue ]   = useState<string>("");
  const listRef                         = useRef<HTMLUListElement | null>(null);
  const currentRoomIdRef                = useRef<number | null>(null);
  const isAlertShownRef                 = useRef<boolean>(false);
  const cursorRef                       = useRef<number | null>(null);
  

  useEffect(() => {
    const container = listRef.current;

    if (!selectedEntityId || !container) return;

    getConversationDetail(selectedEntityId);

    if (!container) return;
    // pagination with cursor-based
    const handleScroll = async () => {
      const scrollTop = container.scrollTop;

      if (scrollTop < 50 && scrollTop > 0) {
        if (!isAlertShownRef.current) {
          isAlertShownRef.current = true;
          
          if(cursorRef.current === null) return;

          try {
            const res = await fetchApi(
              `${import.meta.env.VITE_API_BASE_URL}/conversation/getDetail?cursor=${cursorRef.current}`,
              {
                method: "POST",
                body: JSON.stringify({
                  entityId: selectedEntityId,
                }),
              }
            );
      
            if (res.status == 401) {
              localStorage.removeItem("token");
              navigate("/login");
              return;
            }
      
            const result = await res.json();
            console.log("result", result.data);

            if (!result.data) return;

            setRoom((pre) => {

              if (!pre) return pre;
      
              return {
                ...pre,
                ...result.data,
                messages: [
                  ...pre.messages,
                  ...(result.data.messages || []),
                ],
              };
            });
            // update cursor for cursor-based pagination
            cursorRef.current = result.data.messages?.[result.data.messages.length - 1]?.id || null;
        } catch (error) {
          console.log("error", error);
        }
        }
      } else {
        // Reset when scrolling down
        isAlertShownRef.current = false;
      }
    };
      container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [selectedEntityId])


  useEffect(() => {

    if (!room || !room.messages || room.messages.length === 0) return;

    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }

    socket.on("receiveNewMessage", (newMessage: Message) => {
      setRoom((prev) => {

        if (!prev) return prev;

        return {
          ...prev,
          messages: [newMessage,...(prev.messages || [])],
        };
      });
    });
    return () => {
      socket.off("receiveNewMessage");
    };
  }, [room?.messages]);

  const getConversationDetail = async (selectedEntityId: number) => {
    try {
      const res = await fetchApi(
        `${import.meta.env.VITE_API_BASE_URL}/conversation/getDetail`,
        {
          method: "POST",
          body: JSON.stringify({
            entityId: selectedEntityId,
          }),
        }
      );

      if (res.status == 401) {
        alert('Your session has expired. Please log in again.');
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const result = await res.json();

      if (!result.data) return;

      if (currentRoomIdRef.current) {
        socket.emit("leaveRoom", currentRoomIdRef.current);
      }

      setRoom(result.data);
      cursorRef.current = result.data.messages?.[result.data.messages.length - 1]?.id || null;
      socket.emit("joinRoom", result.data.id);
      currentRoomIdRef.current = result.data.id;
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {

    if (event.key !== "Enter" || inputValue.trim() === "") return;

    if (!user) return; // check user exists. verify token

    if (!room) return; // check room exists

    if (room && !room.id) return; // check id room (id room is not null)

    const newMessage = {
      content: inputValue,
      createAt: new Date().toISOString(),
      roomId: room.id,
      user: {
        id: user.id,
        email: user.email,
        avatar: user.avatar,
      },
    };
    socket.emit("sendMessage", newMessage); // send
    setInputValue("");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        margin: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: "1 1 10%",
          marginBottom: 2,
          borderBottom: "1px solid #ccc",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          position: "relative",
        }}
      >
        {!isMdUp && (
          <Box
            sx={{
              position: "absolute",
              left: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            pl={2}
            onClick={() => {
              console.log("Back icon clicked");
              setIsBack?.(true);
            }}
          >
            <ArrowBackIcon />
          </Box>
        )}

        <Typography variant="h5" component="h2" align="center">
          {t('conversation.title')}
        </Typography>
      </Box>
      
      <List
        ref={listRef}
        sx={{
          flex: "1 1 80%",
          maxHeight: "100%",
          overflowY: "auto",
          marginBottom: 2,
        }}
      >
        {room && room.messages && room.messages.length > 0 ? (
          room.messages.slice().reverse().map((message, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={message.content}
                secondary={message.user.email}
              />
            </ListItem>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography variant="h2" color="text.secondary">
              {t('conversation.startNew')}
            </Typography>
          </Box>
        )}
      </List>

     {room && 
       <Box
       sx={{ flex: "1 1 10%", display: "flex", borderTop: "1px solid #ccc" }}
     >
       <Input
         fullWidth
         placeholder="Type a message..."
         disableUnderline
         sx={{ margin: "10px" }}
         value={inputValue}
         onChange={(e) => setInputValue(e.target.value)}
         onKeyPress={handleKeyPress}
       />
     </Box>
     }
    </Paper>

  );
};

export default Conversation;
