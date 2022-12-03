import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

//component
import SearchGroup from '../SearchGroup';

import * as servicesGroup from '~/services/GroupService';
//mui
import {
    Badge,
    Box,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Modal,
    Typography,
    List,
    Avatar,
    useTheme,
} from '@mui/material';
import {  PlusCircle, Trash } from 'phosphor-react';

//

//
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
function SearchAddGroup({ open1, setOpen1, listGroups, setListGroups }) {
    const theme = useTheme();

    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const handleClose = () => setOpen1(false);
    const [allGroups, setAllGroups] = useState([]);

    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        if(searchResult){
            const ApiRequestGroupAll = async () => {
                if(searchResult.length > 0){
                    const data = searchResult.filter((group) => group.member.includes(currentUser._id));
                    // console.log(res.data);
                    console.log(searchResult);
                    
                    const groupList = searchResult.map((item) => {
                        if (data.some((check) => check._id === item._id)) return { item, status: 1 };
                        return { item, status: 0 };
                    });
                    setAllGroups(groupList);
                }
                else{
                    const res = await servicesGroup.getGroupAll();
                    // const GroupUser =  await servicesUser.getGroupUser(currentUser._id);
        
                    const data = res.data.groupList.filter((group) => group.member.includes(currentUser._id));
                    // console.log(res.data);
        
                    const groupList = res.data.groupList.map((item) => {
                        if (data.some((check) => check._id === item._id)) return { item, status: 1 };
                        return { item, status: 0 };
                    });
                    setAllGroups(groupList);
                }
                
            };
            ApiRequestGroupAll();
        }
    }, [currentUser, listGroups, searchResult]);

    const handleRemoveUserGroup = async (group, userId) => {
        const member = group.member.filter((item) => item !== userId);
        try {
            const res = await servicesGroup.UpdateGroup(
                group._id,
                group.avatarImage,
                group.nameGroup,
                group.description,
                member,
            );
            // res.data
            const list = listGroups.filter((item) => item._id !== group._id);
            setListGroups(list);
            handleClose();
        } catch (err) {
            console.log(err);
        }
    };
    const handleAddUserGroup = async (group, userId) => {
        const member = [...group?.member, userId];
        try {
            const res = await servicesGroup.UpdateGroup(
                group._id,
                group.avatarImage,
                group.nameGroup,
                group.description,
                member,
            );

            setListGroups([
                ...listGroups,
                {
                    _id: group._id,
                    avatarImage: group.avatarImage,
                    nameGroup: group.nameGroup,
                    description: group.description,
                    member: member,
                },
            ]);
            handleClose();
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Modal
            open={open1}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={{ padding: '10px 10px' }}>
                    <Typography variant="h4">Search Group</Typography>
                </Box>
                <SearchGroup setSearchResult={setSearchResult} />
                <List sx={{ height: '80%', overflowY: 'auto', overflowX: 'hidden', padding: '10px 15px' }}>
                    {allGroups.map((group) => {
                        return (
                            <ListItem
                                key={group.item._id}
                                secondaryAction={
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <div>
                                            {group.status === 1 && (
                                                <IconButton
                                                    color="primary"
                                                    sx={{
                                                        background: 'rgb(129 198 232 / 15%)',
                                                        '&:hover': {
                                                            background: 'rgb(129 198 232 / 30%)',
                                                        },
                                                    }}
                                                    onClick={() => handleRemoveUserGroup(group.item, currentUser._id)}
                                                >
                                                    <Trash size={20} />
                                                </IconButton>
                                            )}
                                            {group.status === 0 && (
                                                <IconButton
                                                    color="primary"
                                                    sx={{
                                                        background: 'rgb(129 198 232 / 15%)',
                                                        '&:hover': {
                                                            background: 'rgb(129 198 232 / 30%)',
                                                        },
                                                    }}
                                                    onClick={() => handleAddUserGroup(group.item, currentUser._id)}
                                                >
                                                    <PlusCircle size={20} />
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
                                        {!group.item.avatarImage ? (
                                            <Avatar />
                                        ) : (
                                            <Avatar src={group.item.avatarImage}></Avatar>
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
                                    primary={group.item.nameGroup}
                                    secondary={group.item.description}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </Modal>
    );
}

export default SearchAddGroup;