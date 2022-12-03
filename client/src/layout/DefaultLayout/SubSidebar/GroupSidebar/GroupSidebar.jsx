import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ModelGroup from './ModelGroup';
import GroupList from './GroupList/GroupList';
import * as servicesUser from '~/services/userService';
import { Plus, Users } from 'phosphor-react';
import { IconButton, Stack, Typography } from '@mui/material';
import SearchAddGroup from './SearchAddGroup/SearchAddGroup';
import SearchGroup from './SearchGroup';

function GroupSidebar() {
    const user = useSelector((state) => state.auth.login.currentUser);

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    const [searchResult, setSearchResult] = useState([]);
    const [listGroups, setListGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpen1 = () => setOpen1(true);
    useEffect(() => {
        const apiRequest = async () => {
            setLoading(true);
            if (searchResult.length > 0) {
                console.log(searchResult);
                const listResult = searchResult.filter((item) => item.member.includes(user._id));
                setListGroups(listResult);
            } else {
                const res = await servicesUser.getGroupUser(user._id);
                setListGroups(res.data || []);
            }
            setLoading(false);
        };
        apiRequest();
    }, [user, searchResult]);

    return (
        <Stack direction={'column'} spacing={1} p={3} height="100%">
            <Stack direction={'row'} spacing={1} justifyContent="space-between" alignItems="center">
                <Stack>
                    <Typography variant="h5">Group Chat</Typography>
                </Stack>
                <Stack direction={'row'}>
                    <IconButton onClick={handleOpen1}>
                        <Plus size={20} />
                    </IconButton>
                    <IconButton onClick={handleOpen}>
                        <Users size={20} />
                    </IconButton>
                    <ModelGroup
                        listGroups={listGroups}
                        setListGroups={setListGroups}
                        open={open}
                        handleClose={handleClose}
                    />
                    <SearchAddGroup
                        open1={open1}
                        setOpen1={setOpen1}
                        listGroups={listGroups}
                        setListGroups={setListGroups}
                    />
                </Stack>
            </Stack>
            <Stack padding={'10px 0px 10px 0px'} direction={'row'}>
                <SearchGroup setSearchResult={setSearchResult} />
            </Stack>
            <Stack>
                <Typography variant="h5">Group Chats</Typography>
            </Stack>
            <Stack
                height={'100%'}
                direction="column"
                sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                    height: '100%',
                    '&::-webkit-scrollbar': {
                        width: '3px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#d6dee1',
                        borderRadius: '20px',
                        // border: '6px solid transparent',
                        // backgroundClip: 'content-box',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#a8bbbf',
                    },
                }}
            >
                <GroupList searchResult={searchResult} listGroups={listGroups} />
            </Stack>
        </Stack>
    );
}

export default GroupSidebar;
