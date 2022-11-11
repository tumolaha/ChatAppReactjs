import React from 'react';
//mui
import { AppBar, Avatar, Box,  Container, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcons } from '@mui/icons-material';

//component
import Notification from './Notification';
import Account from './Account';
import AddFriend from './AddFriend/AddFriend';
import Images from '~/assets/images/images';

const Header = () => {
    return (
        <>
            <AppBar
                position="static"
                sx={{ boxShadow: '0 3px 15px rgb(0 0 0 / 7%)', background: 'white', zIndex: 1000 }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            
                        >
                            Message Chat
                        </Typography> */}
                        <Avatar src={Images.logoChat} sx={{ mr: 2, display: { xs: 'none', md: 'flex' }}}/>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                // onClick={handleOpenNavMenu}
                                color="primary"
                            >
                                <MenuIcons fontSize="large" />
                            </IconButton>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            LOGO
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

                        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                            <AddFriend/>
                            <Notification />
                            <Account />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default Header;
