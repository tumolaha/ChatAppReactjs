
import classNames from 'classnames/bind';
import styles from '../Chat.module.scss';
//mui
import { CameraAlt, LocalPhone } from '@mui/icons-material';
import { Avatar, Badge, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
const cx  =  classNames.bind(styles);


function HeaderChat({currentChatSelect}) {
    return (  <div className={cx('header')}>
    <div className={cx('left')}>
        {currentChatSelect.typeChat === 0 && (
            //friends
            <ListItem>
                <ListItemAvatar>
                    <Badge variant="dot" color="success">
                        <Avatar
                            src={`data:image/svg+xml;base64,${
                                currentChatSelect.currentChat.avatarImage || ''
                            }`}
                        ></Avatar>
                    </Badge>
                </ListItemAvatar>
                <ListItemText
                    sx={{
                        '& .MuiListItemText-primary': {
                            fontSize: '1.3rem',
                            // fontStyle: ' bold '
                        },
                        '& .MuiListItemText-secondary': {
                            fontSize: '1.1rem',
                        },
                    }}
                    primary={currentChatSelect.currentChat.first_name + ' ' + currentChatSelect.currentChat.last_name}
                    secondary={'online'}
                ></ListItemText>
            </ListItem>
        )}
        {currentChatSelect.typeChat === 1 && (
            //groups
            <ListItem>
                <ListItemAvatar>
                    <Badge variant="dot" color="success">
                        <Avatar
                            src={`data:image/svg+xml;base64,${
                                currentChatSelect.currentChat.avatarImage || ''
                            }`}
                        ></Avatar>
                    </Badge>
                </ListItemAvatar>
                <ListItemText
                    sx={{
                        '& .MuiListItemText-primary': {
                            fontSize: '1.3rem',
                            // fontStyle: ' bold '
                        },
                        '& .MuiListItemText-secondary': {
                            fontSize: '1.1rem',
                        },
                    }}
                    primary={currentChatSelect.currentChat.nameGroup}
                    secondary={'online'}
                ></ListItemText>
            </ListItem>
        )}
    </div>

    <div className={cx('right')}>
        <IconButton
            sx={{
                fontSize: '2rem',
            }}
        >
            <CameraAlt />
        </IconButton>
        <IconButton>
            <LocalPhone />
        </IconButton>
    </div>
</div> );
}

export default HeaderChat;