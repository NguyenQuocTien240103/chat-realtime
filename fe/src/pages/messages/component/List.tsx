import React, { useEffect, useState } from 'react';
import { useEntity } from '../../../context/EntityContext';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import fetchApi from '../../../utils/fetchApi';

type Conversation = {
  user: {
    id            : number,
    email         : string,
    avatar        : string,
  };
  lastMessage?    : string,
  lastMessageAt?  : string,
  roomId?         : string,
};

const ListComponent: React.FC = () => {
  const { selectedEntityId, setSelectedEntityId } = useEntity();
  const [listConversation,setListConversation] = useState<Conversation[]>([]);
  const getListConversation = async () =>{
    try {
      const res = await fetchApi(`${import.meta.env.VITE_API_BASE_URL}/conversation/getList`,{
        method: "GET",
      })
      const result = await res.json();
      setListConversation(result.data);
    } catch (error: any) {
      console.log("error:", error);
    }
  }
  useEffect(()=>{
    getListConversation();  
  },[])

  const handleOnclick = (e: any, item: Conversation) => {
    setSelectedEntityId(item.user.id)
     
  }

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {listConversation.map((item) => (
        <ListItem
          key={`${item.user.id}`} // kết hợp để tránh key trùng
          alignItems="flex-start"
          // sx={{ cursor: 'pointer' }}
          sx={{
            cursor: 'pointer',
            bgcolor: selectedEntityId === item.user.id ? 'grey.100' : 'transparent', // Active background
          }}
          onClick={(e) => handleOnclick(e,item)}
        >
          <ListItemAvatar>
            <Avatar alt={item.user.avatar} src={item.user.avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={item.user.email}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  noWrap
                  sx={{
                    color: 'text.primary',
                    display: 'inline-block', // hoặc block nếu cần chiếm toàn bộ chiều rộng
                    maxWidth: '200px',       // bạn nên đặt giới hạn cụ thể theo layout
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    verticalAlign: 'middle',
                  }}
                >
                  { item.lastMessage ? "abc" : "nguyễn quốc tiến" }
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
      
    </List>
  );
};  

export default ListComponent;
