import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

//mui
import { ExpandMore } from '@mui/icons-material';
import {
    Avatar,
    Badge,
    IconButton,
    styled,
    useTheme,
    Stack,
    Typography,
    Chip,
    Button,
    Modal,
    Box,
    TextField,
} from '@mui/material';

//component
import * as services from '~/services/userService';
import { setCurrentContact } from '~/redux/Contact/contactSlice';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        // backgroundColor: '#44b700',
        // backgroundColor: 'gray',
        color: '#44b700',
        // color: 'gray',
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // height: '80%',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    // boxShadow: 24,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    pt: 2,
    px: 4,
    pb: 3,
};
export function BasicModal({ open, setOpen }) {
    const handleClose = () => setOpen(false);
    // const [username, setUsername] = useState(currentUser.username);
    const value =  useSelector((state) => state.contact.currentContact.currentChat)

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h5"> Profile Friends</Typography>
                        <Stack direction={'column'} justifyContent="center" alignItems="center">
                            <Avatar src={value?.avatarImage} />
                        </Stack>
                        <Stack direction={'column'}>
                            <Typography variant="h6">First Name</Typography>
                            <TextField
                                id="filled-basic"
                                label="First Name"
                                variant="filled"
                                value={value?.first_name}
                                disabled
                            />
                        </Stack>
                        <Stack direction={'column'}>
                            <Typography variant="h6">Last Name</Typography>
                            <TextField
                                id="filled-basic"
                                label="Last Name"
                                variant="filled"
                                value={value?.last_name}
                            />
                        </Stack>
                        {/* <Stack direction={'column'}>
                        <Typography variant="h6">User Name</Typography>
                        <TextField
                            id="filled-basic"
                            label="User Name"
                            variant="filled"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Stack> */}
                        <Stack direction={'column'}>
                            <Typography variant="h6">Email</Typography>
                            <TextField
                                id="filled-basic"
                                label="Email"
                                variant="filled"
                                value={value?.email}
                            />
                        </Stack>
                        <Stack direction={'column'}>
                            <Typography variant="h6">Phone</Typography>
                            <TextField
                                id="filled-basic"
                                label="Phone"
                                variant="filled"
                                value={value?.phone}
                            />
                        </Stack>
                        <Stack direction={'column'}>
                            <Typography variant="h6">Location</Typography>
                            <TextField
                                id="filled-basic"
                                label="Location"
                                variant="filled"
                                value={value?.location}
                            />
                        </Stack>
                        <Stack direction={'row'} spacing={1} p={1} justifyContent="center" alignItems="center">
                            {/* <Button
                                variant="contained"
                                sx={{ backgroundColor: theme.palette.primary.light }}
                                onClick={apiRequest}
                            >
                                Save Profile
                            </Button> */}
                            <Button variant="outlined" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}
function MessageListItem({ searchResult = [], onlineUser }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);
    const [listFriends, setListFriends] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentSelect, seCurrentSelect] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const apiRequest = async () => {
            setLoading(true);
            if (searchResult.length > 0) {
                setListFriends(searchResult);
            } else {
                const res = await services.getFriendsUser(user._id);
                setListFriends(res.data || []);
            }
            setLoading(false);
        };
        apiRequest();
    }, [user, searchResult]);
    const handleOpen = () => setOpen(true);
    const selectCurrent = (item, index) => {
        dispatch(setCurrentContact({ currentChat: item, typeChat: 0 }));
        seCurrentSelect(index);
    };
    const checkUserOnline = (id) => {
        const userId = onlineUser.filter((item) => item.userId === id);
        if (userId?.length > 0) {
            return true;
        } else {
            return false;
        }
    };
    const theme = useTheme();
    return (
        <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={1} width="100%" p={1}>
            <BasicModal setOpen={setOpen} open={open} />
            {listFriends.map((item, index) => {
                return (
                    <Stack
                        key={item._id}
                        direction="column"
                        justifyContent="space-between"
                        alignItems="center"
                        style={{ width: '100%' }}
                    >
                        <Stack
                            direction={'row'}
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{
                                width: '100%',
                                marginTop: '10px',
                                borderRadius: '10px',
                                backgroundColor:
                                    currentSelect === index ? theme.palette.primary.light : theme.palette.common.white,
                                color:
                                    currentSelect === index ? theme.palette.common.white : theme.palette.common.black,

                                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                '&:hover': {
                                    // opacity: 0.95,
                                    transform: 'scale(1.05)',
                                    transition: '0.1s linear',
                                },
                            }}
                            onClick={() => selectCurrent(item.user, index)}
                        >
                            <Stack p={1} direction="row">
                                <Stack padding={theme.spacing(0.5)}>
                                    <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                        sx={{
                                            '& .MuiBadge-badge': {
                                                backgroundColor: checkUserOnline(item.user._id) ? '#44b700' : 'gray',
                                                // backgroundColor: "#44b700",
                                            },
                                        }}
                                    >
                                        {!item?.user.avatarImage ? (
                                            <Avatar />
                                        ) : (
                                            <Avatar src={item.user.avatarImage}></Avatar>
                                            // <Avatar src={`data:image/svg+xml;base64,${item.user.avatarImage}`}></Avatar>
                                        )}
                                    </StyledBadge>
                                </Stack>
                                <Stack padding={theme.spacing(0.5)}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color:
                                                currentSelect === index
                                                    ? theme.palette.common.white
                                                    : theme.palette.common.black,
                                        }}
                                    >
                                        {item.user.first_name + ' ' + item.user.last_name}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            color:
                                                currentSelect === index
                                                    ? theme.palette.common.white
                                                    : theme.palette.common.black,
                                        }}
                                    >
                                        {item.user.username}
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Stack padding={theme.spacing(1)} direction="column" spacing={0.5}>
                                <Stack direction={'row'}>
                                    <Chip variant="outlined" color="warning" size="small" label="10:30" />
                                </Stack>
                                <Stack direction={'row'} justifyContent="flex-end">
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        sx={{
                                            marginRight: '2px',
                                            color:
                                                currentSelect === index
                                                    ? theme.palette.common.white
                                                    : theme.palette.common.black,
                                            '&:hover': {
                                                background: theme.palette.grey[100],
                                                boxShadow: theme.shadows[2],
                                                color: theme.palette.primary.light,
                                            },
                                        }}
                                        onClick={handleOpen}
                                    >
                                        <ExpandMore />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                );
            })}
        </Stack>
    );
}
MessageListItem.prototype = {
    searchResult: PropTypes.array,
};
export default MessageListItem;
