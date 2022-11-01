import React from 'react';
import { useDispatch } from 'react-redux';

import classNames from 'classnames/bind';
import styles from './SubSidebar.module.scss';

import { Engineering, Logout, PersonAdd, Settings } from '@mui/icons-material';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '~/redux/ApiAuth';

const cx = classNames.bind(styles);

function AccountTop({user}) {
    // const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        try {
            logOutUser(dispatch, navigate);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className={cx('account')}>
                <div style={{ display: 'flex' }}>
                    <Avatar sx={{ width: 35, height: 35 }} variant="rounded" src={`data:image/svg+xml;base64,${user.avatarImage}`} alt={`user`}/>
                    <div className={cx('info')}>
                        <h3 className={cx('name')}>{user.first_name + " " + user.last_name}</h3>
                        <div className={cx('user')}>{user.username}</div>
                    </div>
                </div>
                <div className={cx('control')}>
                    <Tooltip title="Account settings">
                        <IconButton
                            color="primary"
                            size="medium"
                            onClick={handleClick}
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Engineering fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </div>
                
            </div>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar /> Profile
                </MenuItem>
                {/* <MenuItem>
                    <Avatar /> My account
                </MenuItem> */}
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}

export default AccountTop;
