import classNames from 'classnames/bind';
import styles from '../Chat.module.scss';

//mui
import { EmojiEmotions, MoreVert, Reply } from '@mui/icons-material';
import { Avatar, Box, IconButton, Typography, useTheme } from '@mui/material';
import TimeAgo from 'timeago-react';
//component

const cx = classNames.bind(styles);
// TimeAgo.register('vi', vi);

// then use it.

function ChatItem({ own = true, value = {}, currentUser }) {
    const theme = useTheme();
    return (
        <div className={own ? cx('chat-content') : cx('chat-content', 'own')}>
            <Avatar src={`data:image/svg+xml;base64,${value.sender.avatarImage || ''}`} alt="user" />
            <div className={cx('chat_container')}>
                <Typography>{value.sender.username}</Typography>
                <div className={cx('chat_item')}>
                    <Box
                        sx={{
                            backgroundColor: !own ? theme.palette.primary.light : theme.palette.common.white,
                            padding: theme.spacing(1),
                            color: !own ? theme.palette.common.white : theme.palette.common.black,
                            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
                            fontSize: '1.2rem',
                            borderRadius: '10px',
                        }}
                    >
                        {value.message.text}
                    </Box>
                    <div className={cx('chat_control')}>
                        <IconButton>
                            <MoreVert />
                        </IconButton>
                        <IconButton>
                            <Reply />
                        </IconButton>
                        <IconButton>
                            <EmojiEmotions />
                        </IconButton>
                    </div>
                </div>

                <span>
                    <TimeAgo datetime={value.createdAt} locale="vi" />
                </span>
            </div>
        </div>
    );
}

export default ChatItem;
