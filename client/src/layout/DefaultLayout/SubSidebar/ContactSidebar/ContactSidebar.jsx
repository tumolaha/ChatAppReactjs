import { Avatar, IconButton, Typography, Stack, useTheme, Button } from '@mui/material';
import { DotsThreeOutlineVertical, User, UserMinus, UserPlus } from 'phosphor-react';
import { useEffect, useState } from 'react';
import SearchContact from './SearchContact/SearchContact';
import * as services from '~/services/userService';
import { useSelector } from 'react-redux';

export const Comp = ({ status, value, AddFriends, AcceptFriends, RemoveFriends }) => {
    if (status === 0) {
        return (
            <Button
                variant="contained"
                size="small"
                startIcon={<UserPlus size={20} sx={{}} onclick={() => AddFriends()} />}
            >
                add
            </Button>
        );
    }
    if (status === 1) {
        return (
            <Button variant="outlined" size="small" startIcon={<UserPlus size={20} />} onClick={() => RemoveFriends()}>
                cancel
            </Button>
        );
    }
    if (status === 2) {
        return (
            <Stack direction={'row'} alignItems="center" spacing={1}>
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<UserPlus size={20} />}
                    onClick={() => AcceptFriends()}
                >
                    Accept
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<UserMinus size={20} />}
                    onClick={() => RemoveFriends()}
                >
                    remove
                </Button>
            </Stack>
        );
    }
    if (status === 3) {
        return (
            <Button variant="outlined" size="small" startIcon={<User size={20} />} onClick={() => RemoveFriends()}>
                remove
            </Button>
        );
    }
};

function ContactSidebar() {
    const [allUser, setAllUser] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const theme = useTheme();
    useEffect(() => {
        const ApiRequest = async () => {
            if (searchResult.length > 0) {
                const listUser = searchResult.map((user) => {
                    const arrList = [];
                    //check status user
                    const checkUserIsFriends = (userId) => {
                        const userCheck = currentUser.friends.find((friend) => {
                            return friend.user === userId._id;
                        });
                        return userCheck;
                    };
                    const userCheck = checkUserIsFriends(user);
                    if (userCheck) {
                        arrList.push({ data: user, status: userCheck.status });
                    } else {
                        arrList.push({ data: user, status: 0 });
                    }

                    return arrList;
                });
                setAllUser(listUser);
            } else {
                const res = await services.getAllUser();
                const listUser = res.data.map((user) => {
                    const arrList = [];
                    //check status user
                    const checkUserIsFriends = (userId) => {
                        const userCheck = currentUser.friends.find((friend) => {
                            return friend.user === userId._id;
                        });
                        return userCheck;
                    };
                    const userCheck = checkUserIsFriends(user);

                    if (userCheck) {
                        arrList.push({ data: user, status: userCheck.status });
                    } else {
                        arrList.push({ data: user, status: 0 });
                    }

                    return arrList;
                });
                setAllUser(listUser);
            }
        };
        ApiRequest();
    }, [currentUser, searchResult]);

    return (
        <>
            <Stack direction={'column'} spacing={1} p={3}>
                <Stack direction={'row'} justifyContent="space-between" align="center">
                    <Typography variant="h6">Contact</Typography>

                    <IconButton>
                        <DotsThreeOutlineVertical size={20} />
                    </IconButton>
                </Stack>
                <Stack>
                    <SearchContact setSearchResult={setSearchResult} />
                </Stack>
                <Stack
                    direction={'column'}
                    paddingTop={3}
                    spacing={1.5}
                    sx={{ width: '100%', overflow: 'hidden', height: '100%' }}
                >
                    {allUser.map((user) => (
                        <Stack
                            key={user[0].data._id}
                            direction={'row'}
                            justifyContent="space-between"
                            alignItems="center"
                            borderRadius="10px"
                            sx={{
                                width: '100%',
                                backgroundColor: theme.palette.background.default,
                                '&:hover': {
                                    backgroundColor: theme.palette.success.light,
                                    color: theme.palette.common.white,
                                },
                            }}
                        >
                            <Stack direction="row" alignItems="center">
                                <Stack p={1}>
                                    <Avatar src={`data:image/svg+xml;base64,${user[0].data.avatarImage}`} />
                                </Stack>
                                <Stack direction={'column'} spacing={1} p={1}>
                                    <Typography variant="h6">
                                        {user[0].data.first_name + ' ' + user[0].data.last_name}
                                    </Typography>
                                    <Typography variant="subtitle1">{user[0].data.username}</Typography>
                                </Stack>
                            </Stack>
                            <Stack p={1}>
                                <Comp status={user[0].status}></Comp>
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </>
    );
}

export default ContactSidebar;
