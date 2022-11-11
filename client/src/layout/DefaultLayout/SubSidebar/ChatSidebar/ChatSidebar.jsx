import classNames from 'classnames/bind';
import styles from '../SubSidebar.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

//component
import SearchSubsider from './SearchSubside/SearchSubside';
import MessageListItem from './MessageListItem';
import Images from '~/assets/images/images';
//mui
import { Box } from '@mui/system';

import { styled } from '@mui/material/styles';
import { Avatar, Badge, Stack, Typography } from '@mui/material';
import { useState } from 'react';

const cx = classNames.bind(styles);
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

function ChatSidebar() {
    const [searchResult, setSearchResult] = useState([]);
    return (
        <Stack direction={'column'} spacing={1} p={3} height="100%">
            <Stack direction={'row'} spacing={1}>
                <Typography variant="h4">Chat</Typography>
            </Stack>
            <Stack spacing={1} direction={'column'}>
                <Stack padding={'10px 0px 10px 0px'}>
                    <SearchSubsider setSearchResult={setSearchResult} />
                </Stack>
            </Stack>
            <Stack sx={{ width: '100%' }}>
                <Stack>
                    <Typography variant="h6">Online user</Typography>
                </Stack>
                <Stack>
                    <Box sx={{ padding: '10px 0px 10px 0px' }}>
                        <Swiper watchSlidesProgress={true} slidesPerView={4} className="mySwiper">
                            <SwiperSlide className={cx('item-slide')}>
                                <Box
                                    sx={{
                                        padding: '10px 10px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '60px',
                                        width: '50px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: '50%',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: '100',
                                            transform: ' translateY(0px)',
                                        }}
                                    >
                                        <StyledBadge
                                            color="success"
                                            variant="dot"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                        >
                                            <Avatar
                                                src={Images.avatarLogo}
                                                sx={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                                            />
                                        </StyledBadge>
                                    </Box>
                                    <Box
                                        sx={{
                                            height: '50%',
                                            background: '#29d1f32b',
                                            width: '100%',

                                            borderRadius: '10px',

                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',

                                            transform: ' translateY(-2px)',
                                        }}
                                    >
                                        <Typography
                                            noWrap
                                            variant="h6"
                                            sx={{
                                                textOverflow: 'ellipsis',
                                                // overflow: 'hidden',
                                            }}
                                        >
                                            User 1
                                        </Typography>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        </Swiper>
                    </Box>
                </Stack>
            </Stack>
            <Stack>
                <Typography variant="h5">Recent Chats</Typography>
            </Stack>
            <Stack
                height={'100%'}
                direction="column"
                sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                    height: '100%',
                    '&::-webkit-scrollbar': {
                        width: '3px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#d6dee1',
                        borderRadius: '20px',
                        // border: '6px solid transparent',
                        // backgroundClip: 'content-box',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#a8bbbf',
                    },
                }}
            >
                <MessageListItem searchResult={searchResult} />
            </Stack>
        </Stack>
    );
}

export default ChatSidebar;
