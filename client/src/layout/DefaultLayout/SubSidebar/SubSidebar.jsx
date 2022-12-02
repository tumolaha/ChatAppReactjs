import classNames from 'classnames/bind';
import styles from './SubSidebar.module.scss';
import { useSelector } from 'react-redux';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import ChatSidebar from './ChatSidebar/ChatSidebar';
import ProfileSidebar from './ProfileSidebar';
import GroupSidebar from './GroupSidebar';
import ContactSidebar from './ContactSidebar';
import HelpSidebar from './HelpSidebar';
import SettingSidebar from './SettingSidebar';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
//component
const socket = io('http://localhost:5000');
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
    const [onlineUser, setOnlineUser] = useState([]);
    const selected = useSelector((state) => state.sidebar.currentItem.selected);

    let Comp;

    useEffect(() => {
        socket.on('get-online-user', (users) => {
            setOnlineUser(users);
        });
    }, [onlineUser]);
    if (selected === 1) {
        Comp = ProfileSidebar;
    }
    if (selected === 2) {
        Comp = ChatSidebar;
    }
    if (selected === 3) {
        Comp = GroupSidebar;
    }
    if (selected === 4) {
        Comp = ContactSidebar;
    }
    if (selected === 5) {
        Comp = HelpSidebar;
    }
    if (selected === 6) {
        Comp = SettingSidebar;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={cx('wrapper')}>
                <Comp />
            </div>
        </ThemeProvider>
    );
}

export default SubSidebar;
