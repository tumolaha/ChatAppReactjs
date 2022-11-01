import classNames from 'classnames/bind';
import styles from './MessageListItem.module.scss';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

//ui
import { ExpandMore } from '@mui/icons-material';
import {
    Avatar,
    Badge,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tab,
    Tabs,
    useTheme,
} from '@mui/material';

//component
import * as services from '~/services/userService';
import { setCurrentContact } from '~/redux/contactSlice';

const cx = classNames.bind(styles);
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function MessageListItem() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);
    const [value, setValue] = useState(0);

    const [userAll, setUserAll] = useState([]);
    const [groupAll, setGroupAll] = useState([]);
    const [loading, setLoading] = useState(false);

    const [currentSelect, seCurrentSelect] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const apiRequest = async () => {
            setLoading(true);
            if (value === 0) {
                const res = await services.getFriendsUser(user._id);
                setUserAll(res.data || []);
            }
            if (value === 1) {
                const res = await services.getGroupUser(user._id);
                console.log(res, value);
                setGroupAll(res.data || []);
            }
            if (value === 2) {
                // const res = await services.getFriendsUser(user._id);
                setUserAll([]);
            }
            setLoading(false);
        };
        apiRequest();
    }, [value, user]);

    const selectCurrent = (item, value, index) => {
        dispatch(setCurrentContact({ currentChat: item, typeChat: value }));
        seCurrentSelect(index);
    };

    const theme = useTheme();
    return (
        <div className={cx('wrapper')}>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: theme.palette.primary.light,
                    borderRadius: '10px',
                    boxShadow: theme.shadows[3],
                }}
            >
                <Tabs
                    onChange={handleChange}
                    value={value}
                    aria-label="Tabs where each tab needs to be selected manually"
                    sx={{
                        '& .MuiTabs-indicator': {
                            background: theme.palette.primary.contrastText,
                            height: '3px',
                        },
                        '& .MuiTabs-flexContainer': {
                            display: 'flex',
                            justifyContent: 'center',
                        },
                    }}
                >
                    <Tab
                        label="Friend"
                        sx={{
                            color: theme.palette.primary.contrastText,
                            '&.Mui-selected': {
                                color: theme.palette.primary.contrastText,
                            },
                        }}
                        {...a11yProps(0)}
                    />
                    <Tab
                        label="Group"
                        sx={{
                            color: theme.palette.primary.contrastText,
                            '&.Mui-selected': {
                                color: theme.palette.primary.contrastText,
                            },
                        }}
                        {...a11yProps(1)}
                    />
                    <Tab
                        label="Chanel"
                        sx={{
                            color: theme.palette.primary.contrastText,
                            '&.Mui-selected': {
                                color: theme.palette.primary.contrastText,
                            },
                        }}
                        {...a11yProps(2)}
                    />
                </Tabs>
            </Box>
            <div className={cx('list-user')}>
                <TabPanel value={value} index={0}>
                    <List sx={{ margin: 0 }}>
                        {/* friends */}
                        {userAll.map((item, index) => {
                            return (
                                <ListItem
                                    key={item.user._id}
                                    secondaryAction={
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-end',
                                            }}
                                        >
                                            <ListItemText
                                                sx={{
                                                    '& .MuiListItemText-secondary': {
                                                        opacity: 0.7,
                                                        color:
                                                            currentSelect === index
                                                                ? theme.palette.common.white
                                                                : theme.palette.common.black,
                                                    },
                                                }}
                                                secondary={'Secondary text'}
                                            />
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                }}
                                            >
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
                                            </div>
                                        </div>
                                    }
                                    sx={{
                                        marginTop: '10px',
                                        borderRadius: '10px',
                                        backgroundColor:
                                            currentSelect === index
                                                ? theme.palette.primary.light
                                                : theme.palette.common.white,
                                        color:
                                            currentSelect === index
                                                ? theme.palette.common.white
                                                : theme.palette.common.black,
                                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                        '&:hover': {
                                            opacity: 0.95,
                                            transform: 'scale(1.05)',
                                            transition: '0.1s linear',
                                        },
                                    }}
                                    onClick={() => selectCurrent(item.user, value, index)}
                                >
                                    <ListItemAvatar>
                                        <Badge
                                            variant="dot"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            color="success"
                                        >
                                            {!item.user.avatarImage ? (
                                                <Avatar />
                                            ) : (
                                                <Avatar
                                                    src={`data:image/svg+xml;base64,${item.user.avatarImage}`}
                                                ></Avatar>
                                            )}
                                        </Badge>
                                    </ListItemAvatar>
                                    <ListItemText
                                        sx={{
                                            '& .MuiListItemText-primary': {
                                                fontSize: '1.3rem',
                                                color:
                                                    currentSelect === index
                                                        ? theme.palette.common.white
                                                        : theme.palette.common.black,
                                            },
                                            '& .MuiListItemText-secondary': {
                                                opacity: 0.8,
                                                fontSize: '1.1rem',
                                                color:
                                                    currentSelect === index
                                                        ? theme.palette.common.white
                                                        : theme.palette.common.black,
                                            },
                                        }}
                                        primary={item.user.first_name + ' ' + item.user.last_name}
                                        secondary={item.user.username}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <List sx={{ margin: 0 }}>
                        {groupAll.map((item) => {
                            return (
                                <ListItem
                                    key={item._id}
                                    secondaryAction={
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-end',
                                            }}
                                        >
                                            <ListItemText secondary={'Secondary text'} />
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                }}
                                            >
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    sx={{
                                                        marginRight: '2px',
                                                        '&:hover': {
                                                            background: theme.palette.grey[100],
                                                            boxShadow: theme.shadows[2],
                                                            color: theme.palette.primary.light,
                                                        },
                                                    }}
                                                >
                                                    <ExpandMore />
                                                </IconButton>
                                            </div>
                                        </div>
                                    }
                                    sx={{
                                        marginTop: '10px',
                                        borderRadius: '10px',
                                        backgroundColor: theme.palette.common.white,
                                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                        '&:hover': {
                                            // boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                                            backgroundColor: theme.palette.grey[200],
                                            transform: 'scale(1.05)',
                                            transition: '0.1s linear',
                                        },
                                    }}
                                    onClick={() => selectCurrent(item, value)}
                                >
                                    <ListItemAvatar>
                                        <Badge
                                            variant="dot"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            color="success"
                                        >
                                            {!item.avatarImage ? (
                                                <Avatar />
                                            ) : (
                                                <Avatar src={`data:image/svg+xml;base64,${item.avatarImage}`}></Avatar>
                                            )}
                                        </Badge>
                                    </ListItemAvatar>
                                    <ListItemText
                                        sx={{
                                            '& .MuiListItemText-primary': {
                                                fontSize: '1.3rem',
                                            },
                                            '& .MuiListItemText-secondary': {
                                                fontSize: '1.1rem',
                                            },
                                        }}
                                        primary={item.nameGroup}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                </TabPanel>
                <TabPanel value={value} index={2}></TabPanel>
            </div>

            {/* groups */}
        </div>
    );
}

export default MessageListItem;
