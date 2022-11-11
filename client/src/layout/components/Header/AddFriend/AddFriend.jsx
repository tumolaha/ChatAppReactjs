import React, { useState } from 'react';
import { useEffect } from 'react';
import {
    Avatar,
    Badge,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Modal,
    Typography,
    useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import * as services from '~/services/userService';
import SearchSubsider from './SearchSubside/SearchSubside';
import { AddReaction} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { UserCircle, UserMinus, UserPlus } from 'phosphor-react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 'calc(100vh - 70px)',
    bgcolor: 'rgba(241,246,251,1)',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
    padding: '15px 10px',
};
function AddFriend() {
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [allUser, setAllUser] = useState([]);

    const [searchResult, setSearchResult] = useState([]);

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
                // console.log(listUser);
            }
        };
        ApiRequest();
    }, [currentUser, searchResult]);

    const AddFriends = (from, to) => {
        console.log('add friends');
    };
    const RemoveFriends = (from, to) => {
        console.log('remove friends');
    };
    const AcceptFriends = (from, to) => {
        console.log('accept friends');
    };
    return (
        <div>
            <Button variant="outlined" size="large" sx={{ whiteSpace: 'nowrap' }} onClick={handleOpen}>
                Invite Friends
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ padding: '10px 10px' }}>
                        <Typography variant="h4">Search Friend</Typography>
                    </Box>
                    <SearchSubsider setSearchResult={setSearchResult} />
                    <List sx={{ height: '80%', overflowY: 'auto', overflowX: 'hidden', padding: '10px 15px' }}>
                        {allUser.map((item) => {
                            return (
                                <ListItem
                                    key={item[0].data._id}
                                    secondaryAction={
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-end',
                                            }}
                                        >
                                            <div>
                                                {item[0].status === 0 && (
                                                    <IconButton
                                                        color="primary"
                                                        sx={{
                                                            background: 'rgb(129 198 232 / 15%)',
                                                            color:'gray',
                                                            '&:hover': {
                                                                background: 'rgb(129 198 232 / 30%)',
                                                            },
                                                        }}
                                                        onClick={()=>AddFriends(currentUser._id,item[0].data._id)}
                                                    >
                                                        <UserPlus size={20} />
                                                    </IconButton>
                                                )}
                                            </div>
                                            <div>
                                                {item[0].status === 1 && (
                                                    <IconButton
                                                        color="primary"
                                                        sx={{
                                                            background: 'rgb(129 198 232 / 15%)',
                                                            '&:hover': {
                                                                background: 'rgb(129 198 232 / 30%)',
                                                            },
                                                        }}
                                                        onClick={()=>RemoveFriends(currentUser._id,item[0].data._id)}
                                                    >
                                                        <UserMinus size={20} />
                                                    </IconButton>
                                                )}
                                            </div>
                                            <div>
                                                {item[0].status === 2 && (
                                                    <div>
                                                        <IconButton
                                                            color="primary"
                                                            sx={{
                                                                background: 'rgb(129 198 232 / 15%)',
                                                                '&:hover': {
                                                                    background: 'rgb(129 198 232 / 30%)',
                                                                },
                                                            }}
                                                            onClick={()=>AcceptFriends(currentUser._id,item[0].data._id)}
                                                        >
                                                            <AddReaction fontSize="large" />
                                                        </IconButton>
                                                        <IconButton
                                                            color="primary"
                                                            sx={{
                                                                background: 'rgb(129 198 232 / 15%)',
                                                                '&:hover': {
                                                                    background: 'rgb(129 198 232 / 30%)',
                                                                },
                                                            }}
                                                            onClick={()=>RemoveFriends(currentUser._id,item[0].data._id)}
                                                        >
                                                            <UserMinus size={20} />
                                                        </IconButton>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                {item[0].status === 3 && (
                                                    <IconButton
                                                        color="primary"
                                                        sx={{
                                                            background: 'rgb(129 198 232 / 15%)',
                                                            '&:hover': {
                                                                background: 'rgb(129 198 232 / 30%)',
                                                            },
                                                        }}
                                                        onClick={()=>RemoveFriends(currentUser._id,item[0].data._id)}
                                                    >
                                                        <UserCircle size={20} />
                                                    </IconButton>
                                                )}
                                            </div>
                                        </div>
                                    }
                                    sx={{
                                        marginTop: '10px',
                                        borderRadius: '10px',
                                        backgroundColor: theme.palette.common.white,
                                        // currentSelect === index
                                        //     ? theme.palette.primary.light
                                        //     : theme.palette.common.white,
                                        color: theme.palette.common.black,
                                        // currentSelect === index
                                        //     ? theme.palette.common.white
                                        //     : theme.palette.common.black,
                                        boxShadow: '0 3px 20px rgb(0 0 0 / 4%)',
                                        '&:hover': {
                                            opacity: 0.95,
                                            boxShadow:
                                                '0 0 transparent,0 0 transparent,0 0 transparent,0 0 transparent,0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04)',
                                            transform: 'scale(1.05)',
                                            transition: '0.1s linear',
                                        },
                                    }}
                                    // onClick={() => selectCurrent(item[0].data.user, value, index)}
                                >
                                    <ListItemAvatar>
                                        <Badge
                                            variant="dot"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            color="success"
                                        >
                                            {!item[0].data.avatarImage ? (
                                                <Avatar />
                                            ) : (
                                                <Avatar
                                                    src={`data:image/svg+xml;base64,${item[0].data.avatarImage}`}
                                                ></Avatar>
                                            )}
                                        </Badge>
                                    </ListItemAvatar>
                                    <ListItemText
                                        sx={{
                                            '& .MuiListItemText-primary': {
                                                fontSize: '1.3rem',
                                                color: theme.palette.common.black,
                                                // currentSelect === index
                                                //     ? theme.palette.common.white
                                                //     : theme.palette.common.black,
                                            },
                                            '& .MuiListItemText-secondary': {
                                                opacity: 0.8,
                                                fontSize: '1.1rem',
                                                color: theme.palette.common.black,
                                                // currentSelect === index
                                                //     ? theme.palette.common.white
                                                //     : theme.palette.common.black,
                                            },
                                        }}
                                        primary={item[0].data.first_name + ' ' + item[0].data.last_name}
                                        secondary={item[0].data.username}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            </Modal>
        </div>
    );
}

export default AddFriend;
