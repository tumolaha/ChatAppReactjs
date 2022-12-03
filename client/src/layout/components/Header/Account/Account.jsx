import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { Alert, Avatar, Box, Divider, ListItemIcon, Menu, MenuItem, Snackbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '~/redux/Auth/ApiAuth';
function Account() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
 
    const handleClickAlert = () => {
        setOpenAlert(true);
    };
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const checkLogout = useSelector((state) => state.auth.logOut);
    const handleLogout = () => {
        logOutUser(dispatch, navigate);
        handleClickAlert();
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };
    return (
        <>
            <Box
                margin={'10px 20px'}
                onClick={handleClick}
                padding={'5px 15px'}
                sx={{
                    borderRadius: '10px',
                    background: 'rgba( 0, 119, 255, 0.135 )',
                    boxShadow: '0px 9px 20px -10px rgb(31, 38, 135 , 0.37 )',
                    backdropFilter: 'blur( 4px )',
                    border: '1px solid rgba( 255, 255, 255, 0.138 )',

                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Avatar
                    variant="circular"
                    src={currentUser.avatarImage}
                    sx={{ width: 30, height: 30, marginRight: '10px' }}
                />
                <div>
                    <Typography variant="h6" component="h6" color={'gray'} fontSize="1rem">
                        {currentUser.first_name + ' ' + currentUser.last_name}
                    </Typography>
                    <Typography color={'gray'} fontSize="0.9rem">
                        {currentUser.username}
                    </Typography>
                </div>
            </Box>
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
                        padding: ' 10px',
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem
                    sx={{
                        borderRadius: '10px',
                        '&:hover': {
                            background: 'rgba(75,156,242,0.13)',
                        },
                    }}
                >
                    My account
                </MenuItem>
                <Divider />
                {/* <MenuItem
                    sx={{
                        borderRadius: '10px',
                        '&:hover': {
                            background: 'rgba(75,156,242,0.13)',
                        },
                    }}
                >
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem
                    sx={{
                        borderRadius: '10px',
                        '&:hover': {
                            background: 'rgba(75,156,242,0.13)',
                        },
                    }}
                >
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem> */}
                <MenuItem
                    sx={{
                        borderRadius: '10px',
                        '&:hover': {
                            background: 'rgba(75,156,242,0.13)',
                        },
                    }}
                    onClick={handleLogout}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
            <Snackbar
                open={openAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                autoHideDuration={5000}
                onClose={handleCloseAlert}
            >
                {!checkLogout.error ? (
                    <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                        login a success message!
                    </Alert>
                ) : (
                    <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
                        logout false!
                    </Alert>
                )}
            </Snackbar>
        </>
    );
}

export default Account;
