import React from 'react';
import { useEntity } from '../../../context/EntityContext';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

type Item = {
  id: number;
  avatar: string;
  primary: string;
  secondary: string;
  name: string;
}

const items: Item[] = [
  {
    id: 1,
    avatar: '/static/images/avatar/1.jpg',
    primary: 'Brunch this weekend?',
    secondary: "I'll be in your neighborhood doing errands this…",
    name: 'Ali Connors',
  },
  {
    id: 2,
    avatar: '/static/images/avatar/2.jpg',
    primary: 'Summer BBQ',
    secondary: "Wish I could come, but I'm out of town this…",
    name: 'to Scott, Alex, Jennifer',
  },
  {
    id: 3,
    avatar: '/static/images/avatar/3.jpg',
    primary: 'Oui Oui',
    secondary: 'Do you have Paris recommendations? Have you ever…',
    name: 'Sandra Adams',
  },
  {
    id: 4,
    avatar: '/static/images/avatar/1.jpg',
    primary: 'Brunch this weekend?',
    secondary: "I'll be in your neighborhood doing errands this…",
    name: 'Ali Connors',
  },
  {
    id: 5,
    avatar: '/static/images/avatar/2.jpg',
    primary: 'Summer BBQ',
    secondary: "Wish I could come, but I'm out of town this…",
    name: 'to Scott, Alex, Jennifer',
  },
  {
    id: 6,
    avatar: '/static/images/avatar/3.jpg',
    primary: 'Oui Oui',
    secondary: 'Do you have Paris recommendations? Have you ever…',
    name: 'Sandra Adams',
  },
  {
    id: 7,
    avatar: '/static/images/avatar/1.jpg',
    primary: 'Brunch this weekend?',
    secondary: "I'll be in your neighborhood doing errands this…",
    name: 'Ali Connors',
  },
  {
    id: 8,
    avatar: '/static/images/avatar/2.jpg',
    primary: 'Summer BBQ',
    secondary: "Wish I could come, but I'm out of town this…",
    name: 'to Scott, Alex, Jennifer',
  },
  {
    id: 9,
    avatar: '/static/images/avatar/3.jpg',
    primary: 'Oui Oui',
    secondary: 'Do you have Paris recommendations? Have you ever…',
    name: 'Sandra Adams',
  },
  // có thể thêm nhiều item...
];

const ListComponent: React.FC = () => {
  const { selectedEntity, setSelectedEntity } = useEntity();

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {items.map((item) => (
        <ListItem
          key={`${item.id}-${item.name}`} // kết hợp để tránh key trùng
          alignItems="flex-start"
          sx={{ cursor: 'pointer' }}
          onClick={() => setSelectedEntity(item.id)}
        >
          <ListItemAvatar>
            <Avatar alt={item.name} src={item.avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={item.primary}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: 'text.primary', display: 'inline' }}
                >
                  {item.name}
                </Typography>
                {` — ${item.secondary}`}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ListComponent;
