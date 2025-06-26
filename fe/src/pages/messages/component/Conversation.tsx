import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Input, Paper, List, ListItem, ListItemText } from '@mui/material';
import { useEntity } from '../../../context/EntityContext';

type MessageType = 'Sent' | 'Received';

type Message = {
  text: string;
  type: MessageType;
}

const Conversation: React.FC = () => {
  const { selectedEntity } = useEntity();
  console.log('selectedEntity', selectedEntity);

  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello! How are you?', type: 'Received' },
    { text: "I'm good, thank you! How about you?", type: 'Sent' },
    { text: "I'm doing well, thanks for asking!", type: 'Received' },
  ]);

  const [inputValue, setInputValue] = useState('');
  const listRef = useRef<HTMLUListElement | null>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setMessages((prev) => [...prev, { text: inputValue, type: 'Sent' }]);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

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
        {messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText primary={message.text} secondary={message.type} />
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
