import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Input, Paper, List, ListItem, ListItemText } from '@mui/material';
import { useEntity } from '../../../context/EntityContext';
import fetchApi from '../../../utils/fetchApi';
import { useUser } from '../../../hooks/useUser';
import { socket } from '../../../socket';

type User = {
  id            : number;
  email         : string;
  avatar?       : string;
}

type Message = {
  id?           : number;
  content?      : string;
  createAt?     : string;
  roomId        : number;
  user          : User;
}

// type Room = {
//   roomId        : number;
//   type?         : string;
//   name?         : string;
// }

type UserRoom = {
  id            : number;
  userId        : number;
  roomId        : number;
}

type Room = {
  id            : number;
  type          : string;
  name?         : string;
  userRooms     : UserRoom[]; 
  messages      : Message[];
}

const Conversation: React.FC = () => {
  const { selectedEntityId } = useEntity();
  const { user } = useUser();
  // const [messages, setMessages] = useState<Message[] | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [inputValue, setInputValue] = useState('');
  const listRef = useRef<HTMLUListElement | null>(null);

  
  useEffect(()=>{
    if(selectedEntityId){
        getConversationDetail(selectedEntityId);
    }
  },[selectedEntityId])
  
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }

    socket.on("receiveNewMessage",(newMessage : Message)=>{
      // if (!room?.messages) {
      //   // setMessages([newMessage]);
      //   // setRoom()
      //   setRoom((prev)=>{
      //     if(!prev) return prev;
      //     return{
      //       ...prev,
      //       messages: [...(prev.messages || []), newMessage],
      //     }
      //   })
      // } else {
      //   // setMessages((prev) => (prev ? [...prev, newMessage] : [newMessage]));
      //   setRoom((prev) => {
      //     if (!prev) return prev; // hoặc return null
      //     return {
      //       ...prev,
      //       messages: [...(prev.messages || []), newMessage],
      //     };
      //   });        
      // }
      setRoom((prev)=>{
        if(!prev) return prev;
        return{
          ...prev,
          messages: [...(prev.messages || []), newMessage],
        }
      })
    })

    return () => {
      socket.off("receiveNewMessage"); 
    };

  }, [room?.messages]);

  useEffect(()=>{
      socket.connect();

      return () =>{
        socket.disconnect();
      }
  },[])

  const getConversationDetail = async (selectedEntityId : number) =>{
    try {
      const res = await fetchApi(`${import.meta.env.VITE_API_BASE_URL}/conversation/getDetail`,{
        method: "POST",
        body: JSON.stringify({
          entityId: selectedEntityId,
        })
      })
      const result = await res.json();
     
      // if ((!result.data || !Array.isArray(result.data)) && result) { // result.data not array (room have not message yet)
      //   setMessages(null);
      //   setRoom(result.data);
      //   return;
      // }      
      setRoom(result.data);

    } catch (error) {
      console.log("error",error);
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {

    if (event.key !== 'Enter' || inputValue.trim() === '') return;
  
    if(!user) return;                 // check user exists. verify token
    
    if(!room) return;                 // check room exists

    if(room && !room.id) return;  // check id room (id room is not null)
    
    const newMessage = {
      content: inputValue,
      createAt: new Date().toISOString(),
      roomId: room.id,
      user: {
        id: user.id,
        email: user.email,
        avatar: user.avatar,
      }
    };
    socket.emit("sendMessage", newMessage); // send
    setInputValue(''); 
  };
    return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        margin: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          flex: '1 1 10%',
          marginBottom: 2,
          borderBottom: '1px solid #ccc',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <Typography variant="h5" component="h2" align="center">
          Conversation
        </Typography>
      </Box>

      <List
        ref={listRef}
        sx={{
          flex: '1 1 80%',
          maxHeight: '100%',
          overflowY: 'auto',
          marginBottom: 2,
        }}
      >
        {room && room.messages && room.messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText primary={message.content} secondary={ message.user.email} />
          </ListItem>
        ))}
      </List>

      <Box sx={{ flex: '1 1 10%', display: 'flex', borderTop: '1px solid #ccc' }}>
        <Input
          fullWidth
          placeholder="Type a message..."
          disableUnderline
          sx={{ margin: '10px' }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </Box>
    </Paper>
  );
};

export default Conversation;
