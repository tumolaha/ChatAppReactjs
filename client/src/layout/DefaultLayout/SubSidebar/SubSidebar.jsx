import React from 'react';
import classNames from 'classnames/bind';
import styles from './SubSidebar.module.scss';

import {
    CssBaseline,
    ThemeProvider,
} from '@mui/material';

import { createTheme } from '@mui/material/styles';
//component
import { useSelector } from 'react-redux';

import AccountTop from './AccountTop';
import SearchSubsider from './SearchSubside/SearchSubside';
import MessageListItem from './MessageListItem';

const cx = classNames.bind(styles);

const theme = createTheme({
    palette: {
        secondary: {
            light: '#cfd8dc',
            main: '#b0bec5',
            dark: '#78909c',
            contrastText: '#455a64',
        },
    },
});

function SubSidebar() {
    const user = useSelector((state) => state.auth.login.currentUser);


    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={cx('wrapper')}>
                <div className={cx('top')}>
                    <AccountTop user={user} />
                </div>
                <div className={cx('content')}>
                    <div className={cx('search')}>
                        <SearchSubsider />
                    </div>
                    <div className={cx('container')}>
                        <MessageListItem/>
                        
                    </div>
                </div>
                <div className={cx('bottom')}></div>
            </div>
        </ThemeProvider>
    );
}

export default SubSidebar;
