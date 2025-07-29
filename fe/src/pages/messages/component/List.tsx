import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEntity } from "../../../context/EntityContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import fetchApi from "../../../utils/fetchApi";
import ListItemButton from "@mui/material/ListItemButton";
import { Socket } from "socket.io-client";

type Conversation = {
  user: {
    id: number;
    email: string;
    avatar: string;
  };
  lastMessage?: string;
  lastMessageAt?: string;
  roomId?: string;
};

type ListComponentProps = {
  isBack?: boolean;
  setIsBack?: React.Dispatch<React.SetStateAction<boolean>>;
  socket : Socket;
};

const ListComponent: React.FC<ListComponentProps> = ({ setIsBack, socket }) => {
  const navigate  = useNavigate();
  const { selectedEntityId, setSelectedEntityId } = useEntity();
  const [ listConversation, setListConversation ] = useState<Conversation[]>([]);

  const getListConversation = async () => {
    try {
      const res = await fetchApi(
        `${import.meta.env.VITE_API_BASE_URL}/conversation/getList`,
        {
          method: "GET",
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

      setListConversation(result.data);
    } catch (error: any) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getListConversation();
  }, []); 

  useEffect(() => {
    socket.on("updateListConversation", (newConversation: Conversation) => {
    
      console.log("newConversation",newConversation);
      setListConversation((prev) => {
        
        const existingConversation = prev.filter(
          (conv) => conv.user.id !== newConversation.user.id
        );
        console.log("existingConversation",existingConversation);
       
        return [
          {
            user: newConversation.user,
            roomId: newConversation.roomId,
            lastMessage: newConversation.lastMessage,
            lastMessageAt: newConversation.lastMessageAt,
          },
          ...existingConversation,
        ];
      });
    });

    return () => {
      socket.off("updateListConversation");
    };
  },[]);

  const handleOnclick = (e: any, item: Conversation) => {
    setSelectedEntityId(item.user.id);
    setIsBack?.(false);
  };

  return (
    <List
      sx={{
        width: "100%",
        // maxWidth: isBack ? null : 360,
        bgcolor: "background.paper",
      }}
    >
      {/* <List sx={{ width: '100%', bgcolor: 'background.paper' }}> */}
      {listConversation.map((item) => (
        <ListItem
          key={`${item.user.id}`}
          alignItems="flex-start"
          sx={{
            cursor: "pointer",
          }}
          onClick={(e) => handleOnclick(e, item)}
        >
          <ListItemButton selected={selectedEntityId === item.user.id}>
            <ListItemAvatar>
              <Avatar alt={item.user.avatar} src={item.user.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "block",
                    maxWidth: "100%",
                  }}
                >
                  {item.user.email}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    noWrap
                    sx={{
                      color: "text.primary",
                      display: "inline-block",
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      verticalAlign: "middle",
                    }}
                  >
                    {item.lastMessage}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ListComponent;
