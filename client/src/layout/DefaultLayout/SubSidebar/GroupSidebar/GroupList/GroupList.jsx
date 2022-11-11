import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

//mui
import { ExpandMore } from '@mui/icons-material';
import { Avatar, Badge, IconButton, styled, useTheme, Stack, Typography, Chip } from '@mui/material';

//component
import * as services from '~/services/userService';
import { setCurrentContact } from '~/redux/Contact/contactSlice';

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

function GroupList({ searchResult }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);
    const [listGroups, setListGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    const [currentSelect, seCurrentSelect] = useState(null);

    useEffect(() => {
        const apiRequest = async () => {
            setLoading(true);
            if (searchResult.length > 0) {
                setListGroups(searchResult);
            } else {
                const res = await services.getGroupUser(user._id);
                console.log(res);
                setListGroups(res.data || []);
                console.log(searchResult);
            }

            setLoading(false);
        };
        apiRequest();
    }, [user, searchResult]);
    const selectCurrent = (item, index) => {
        dispatch(setCurrentContact({ currentChat: item, typeChat: 1 }));
        seCurrentSelect(index);
    };
    const theme = useTheme();
    return (
        <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={1} width="100%" p={1}>
            {listGroups.map((item, index) => {
                return (
                    <Stack
                        key={item._id}
                        direction={'row'}
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            width: '100%',
                            marginTop: '10px',
                            borderRadius: '10px',
                            backgroundColor:
                                currentSelect === index ? theme.palette.primary.light : theme.palette.common.white,
                            color: currentSelect === index ? theme.palette.common.white : theme.palette.common.black,

                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            '&:hover': {
                                // opacity: 0.95,
                                transform: 'scale(1.05)',
                                transition: '0.1s linear',
                            },
                        }}
                        onClick={() => selectCurrent(item, index)}
                    >
                        <Stack p={1} direction="row">
                            <Stack padding={theme.spacing(0.5)}>
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    {!item.avatarImage ? (
                                        <Avatar />
                                    ) : (
                                        <Avatar src={`data:image/svg+xml;base64,${item.avatarImage}`}></Avatar>
                                    )}
                                </StyledBadge>
                            </Stack>
                            <Stack direction="row" padding={theme.spacing(0.5)}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color:
                                            currentSelect === index
                                                ? theme.palette.common.white
                                                : theme.palette.common.black,
                                    }}
                                >
                                    {item.nameGroup}
                                </Typography>
                                {/* <Typography
                                    variant="subtitle1"
                                    sx={{
                                        color:
                                            currentSelect === index
                                                ? theme.palette.common.white
                                                : theme.palette.common.black,
                                    }}
                                >
                                    {item.username}
                                </Typography> */}
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
                                >
                                    <ExpandMore />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Stack>
                );
            })}
        </Stack>
    );
}

export default GroupList;
