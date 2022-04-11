import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Icon28LogoVk } from '@vkontakte/icons';
import DirectionsSubwayFilledIcon from '@mui/icons-material/DirectionsSubwayFilled';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import SchoolIcon from '@mui/icons-material/School';
import MmsIcon from '@mui/icons-material/Mms';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

export default function NestedList() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Ссылки на соцсети университета
        </ListSubheader>
      }
    >
      <ListItemButton component='a' href='https://www.stu.ru/' target='_blank'>
        <ListItemIcon>
          <DirectionsSubwayFilledIcon />
        </ListItemIcon>
        <ListItemText primary="Оффициальный сайт" />
      </ListItemButton>

      <ListItemButton component='a' href='https://www.stu.ru/' target='_blank'>
        <ListItemIcon>
          <PhoneIphoneIcon/>
        </ListItemIcon>
        <ListItemText primary="Мобильное приложение" />
      </ListItemButton>

      <ListItemButton component='a' href='http://moodle3.stu.ru/' target='_blank'>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Moodle3" />
      </ListItemButton>

      <ListItemButton component='a' href='https://t.me/sgupsyourroadinfuture' target='_blank'>
        <ListItemIcon>
          <TelegramIcon />
        </ListItemIcon>
        <ListItemText primary="Telegram" />
      </ListItemButton>

      <ListItemButton component='a' href='https://www.stu.ru/' target='_blank'>
        <ListItemIcon>
          <InstagramIcon />
        </ListItemIcon>
        <ListItemText primary="Instagram" />
      </ListItemButton>

      <ListItemButton component='a' onClick={handleClick}>
        <ListItemIcon>
          <Icon28LogoVk />
        </ListItemIcon>
        <ListItemText primary="VK" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} component='a' href='https://vk.com/sgups' target='_blank'>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="НИИЖТ-СГУПС" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component='a' href='https://vk.com/kdc_sgups' target='_blank'>
            <ListItemIcon>
              <TheaterComedyIcon />
            </ListItemIcon>
            <ListItemText primary="Культурно-досуговый центр СГУПС" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component='a' href='https://vk.com/poezdatiy' target='_blank'>
            <ListItemIcon>
              <MmsIcon />
            </ListItemIcon>
            <ListItemText primary="Поездатый паблик СГУПС" />
          </ListItemButton>
        </List>
      </Collapse>

    </List>
  );
}
