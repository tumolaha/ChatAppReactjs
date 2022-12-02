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
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import * as serviceUser from '~/services/userService';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
const socket = io('http://localhost:5000');

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
    const [onlineUser, setOnlineUser] = useState([]);
    const [listUser, setListUsers] = useState([]);
    const [listFriendsOnline, setListFriendsOnline] = useState([]);
    

    const currentUser = useSelector((state) => state.auth.login.currentUser);
    //get online user socket
    useEffect(() => {
        socket.on('get-online-user', (users) => {
            setOnlineUser(users);
        });
    }, []);
    //check user online friends
    useEffect(() => {
        const ApiRequest = async () => {
            const res = await serviceUser.getFriendsUser(currentUser?._id);
            setListUsers(res.data);
        };
        ApiRequest();
    }, [currentUser]);
    useEffect(() => {
        const ApiRequest = async () => {
            const checkUserIsFriends = (userId) => {
                return listUser.find((users) => users?.user?._id === userId);
            };
            const list = [];
            onlineUser.forEach((item) => {
                const checkUserIsFriend = checkUserIsFriends(item.userId);
                if (checkUserIsFriend) return list.push(checkUserIsFriend);
            });
            setListFriendsOnline(list);
        };
        ApiRequest();
    }, [onlineUser, listUser]);
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
                <Stack height={'80px'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ padding: '10px 0px 10px 0px' , height: '100%',width: '100%' }}>
                        <Swiper watchSlidesProgress={true} slidesPerView={4} className="mySwiper">
                            <SwiperSlide className={cx('item-slide')}>
                                {listFriendsOnline.map((item) => {
                                    return (
                                        <Box
                                            key={item._id}
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
                                                        src={`data:image/svg+xml;base64,${item.user.avatarImage}`}
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
                                                    {item.user.first_name + ' ' + item.user.last_name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </SwiperSlide>
                        </Swiper>
                    </Box>
                    {listFriendsOnline.length === 0 && (
                        <Typography variant="subtitle1" sx={{ fontSize: '1.2rem', position: 'absolute'}}>
                            no online friends
                        </Typography>
                    )}
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
                <MessageListItem onlineUser ={onlineUser} searchResult={searchResult} />
            </Stack>
        </Stack>
    );
}

export default ChatSidebar;
