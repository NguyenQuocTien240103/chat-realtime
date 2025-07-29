import { Container, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
      <Box>
        <Typography variant="h3" gutterBottom>
          👋 {t('home.title')}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {t('home.description')}
        </Typography>
      </Box>

      <Box sx={{ mt: 6, textAlign: 'left' }}>
        <Typography variant="h5" gutterBottom>
          🌟 {t('home.featuresTitle')}
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              <ChatBubbleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={t('home.feature1')} />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <LockOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t('home.feature2')} />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <PhoneIphoneOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t('home.feature3')} />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default Home;
