import { Avatar, IconButton, Typography, Stack, useTheme, Button, Tooltip } from '@mui/material';
import { Check, DotsThreeOutlineVertical, Trash, User, UserMinus, UserPlus } from 'phosphor-react';
import { useEffect, useState } from 'react';
import SearchContact from './SearchContact/SearchContact';
import * as services from '~/services/FriendsService';
import * as servicesUser from '~/services/userService';
import { useSelector } from 'react-redux';
// , value, AddFriends, AcceptFriends, RemoveFriends




export const Comp = ({ status, value, currentUser, listFriends, setListFriends }) => {
    const AddFriends = async (from, to) => {
        const res = await services.SendRequestFriends(from, to);
        const list = listFriends;

        const tmp = {
            user: {
                _id: to,
            },
            status: 1,
        };
        setListFriends([...list, tmp]);
        console.log(res);
    };
    const RemoveFriends = async (from, to) => {
        const res = await services.UnFriends(from, to);
        let list = listFriends.filter((item) => item.user._id !== to);
        setListFriends([...list]);
        console.log(res);
    };
    const AcceptFriends = async (from, to) => {
        const res = await services.AcceptFriends(from, to);
        let list = listFriends;
        const listIndex = listFriends.findIndex((obj) => obj.user._id === to);
        list[listIndex].status = 3;
        setListFriends([...list]);
        console.log(res);
    };

    if (status === 0) {
        return (
            <Button
                variant="contained"
                size="small"
                startIcon={<UserPlus size={20} />}
                onClick={() => AddFriends(currentUser, value._id)}
            >
                add
            </Button>
        );
    }
    if (status === 1) {
        return (
            <Button
                variant="outlined"
                size="small"
                startIcon={<UserPlus size={20} />}
                onClick={() => RemoveFriends(currentUser, value._id)}
            >
                cancel
            </Button>
        );
    }
    if (status === 2) {
        return (
            <Stack direction={'row'} alignItems="center" spacing={1}>
                <Tooltip title="Accept Friend" arrow>
                    <IconButton onClick={() => AcceptFriends(currentUser, value._id)}>
                        <Check size={20} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Remove Friend" arrow>
                    <IconButton onClick={() => RemoveFriends(currentUser, value._id)}>
                        <Trash size={20} />
                    </IconButton>
                </Tooltip>
            </Stack>
        );
    }
    if (status === 3) {
        return (
            <Button
                variant="outlined"
                size="small"
                startIcon={<User size={20} />}
                onClick={() => RemoveFriends(currentUser, value._id)}
            >
                remove
            </Button>
        );
    }
};

function ContactSidebar() {
    const [allUser, setAllUser] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [listFriends, setListFriends] = useState([]);
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const theme = useTheme();

    useEffect(() => {
        const ApiRequest = async () => {
            const res = await servicesUser.getFriendsUser(currentUser._id);
            setListFriends(res.data || []);
        };
        ApiRequest();
    }, [currentUser]);

    useEffect(() => {
        const ApiRequest = async () => {
            if (searchResult.length > 0) {
                const listUser = searchResult.map((user) => {
                    const arrList = [];
                    //check status user
                    const checkUserIsFriends = (userId) => {
                        const userCheck = listFriends.find((friend) => {
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
                const res = await servicesUser.getAllUser();
                const listUser = res.data.map((user) => {
                    const arrList = [];
                    //check status user
                    const checkUserIsFriends = (userCheck) => {
                        const userFriend = listFriends.find((friend) => {
                            return friend.user._id === userCheck._id;
                        });
                        return userFriend;
                    };
                    const userIsFriend = checkUserIsFriends(user);

                    if (userIsFriend) {
                        // console.log('user', userIsFriend, 'user: ', user);
                        arrList.push({ data: user, status: userIsFriend.status });
                    } else {
                        // console.log('user', userIsFriend, 'user: ', user);
                        arrList.push({ data: user, status: 0 });
                    }
                    return arrList;
                });
                setAllUser(listUser);
            }
        };
        ApiRequest();
    }, [currentUser, listFriends, searchResult]);

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
                                    <Avatar src={user[0].data.avatarImage} />
                                </Stack>
                                <Stack direction={'column'} spacing={1} p={1}>
                                    <Typography
                                        variant="h6"
                                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}
                                    >
                                        {user[0].data.first_name + ' ' + user[0].data.last_name}
                                    </Typography>
                                    <Typography variant="subtitle1">{user[0].data.username}</Typography>
                                </Stack>
                            </Stack>
                            <Stack p={1}>
                                <Comp
                                    status={user[0].status}
                                    value={user[0].data}
                                    currentUser={currentUser._id}
                                    listFriends={listFriends}
                                    setListFriends={setListFriends}
                                ></Comp>
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </>
    );
}

export default ContactSidebar;
