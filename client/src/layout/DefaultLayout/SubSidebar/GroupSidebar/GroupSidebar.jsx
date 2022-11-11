import { useEffect, useState } from 'react';

//component
import SearchGroup from './SearchGroup';

//mui
import {
    Avatar,
    Box,
    Chip,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    OutlinedInput,
    Select,
    Stack,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import GroupList from './GroupList/GroupList';
import { Users } from 'phosphor-react';

import * as services from '~/services/userService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
// chip
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(user, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(user.user) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export function MultipleSelectChip() {
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
    const [contact, setContact] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            // typeof value === 'string' ? value.username.split(',') : value.username,
            value,
        );
    };
    useEffect(() => {
        const requestApi = async () => {
            const res = await services.getAllUser();
            setContact(res.data);
        };
        requestApi();
    }, []);
    const handleDelete = (chipToDelete) => () => {
        setPersonName((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    return (
        <FormControl sx={{ m: 1, width: '100%' }}>
            <InputLabel id="demo-multiple-chip-label">Select Member</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Select Member" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip
                                avatar={
                                    <Avatar
                                        alt={value.username}
                                        src={`data:image/svg+xml;base64,${value.avatarImage}`}
                                    />
                                }
                                key={value._id}
                                label={value.username}
                                onDelete={handleDelete(value)}
                            />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {contact.map((user) => (
                    <MenuItem key={user._id} value={user} style={getStyles(user, personName, theme)}>
                        {user.username}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
export const ModalGroup = ({ open, handleClose }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack direction={'column'} spacing={1.5}>
                    <Stack direction={'row'} spacing={1}>
                        <Typography variant="h5">Create Group</Typography>
                    </Stack>
                    <Stack direction={'column'} spacing={1}>
                        <Stack direction={'row'}>
                            <Typography variant="h6">Group Name</Typography>
                        </Stack>
                        <Stack direction={'row'} p={1}>
                            <TextField
                                id="outlined-basic"
                                label="Enter Group Name"
                                variant="outlined"
                                sx={{ width: '100%' }}
                            />
                        </Stack>
                    </Stack>
                    <Stack direction={'column'} spacing={1}>
                        <Stack direction={'row'}>
                            <Typography variant="h6">Group Members</Typography>
                        </Stack>
                        <Stack direction={'row'}>
                            <MultipleSelectChip />
                        </Stack>
                        {/* <TextField id="outlined-basic" label="Enter Group Name" variant="outlined" /> */}
                    </Stack>
                    <Stack direction={'row'}>
                        <Typography variant="h6">Description</Typography>
                        {/* <TextField id="outlined-basic" label="Enter Group Name" variant="outlined" /> */}
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
};

function GroupSidebar() {
    const [open, setOpen] = useState(false);

    const [searchResult, setSearchResult] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log('object');
    return (
        <Stack direction={'column'} spacing={1} p={3} height="100%">
            <Stack direction={'row'} spacing={1} justifyContent="space-between" alignItems="center">
                <Stack>
                    <Typography variant="h5">Group Chat</Typography>
                </Stack>
                <Stack>
                    <IconButton onClick={handleOpen}>
                        <Users size={20} />
                    </IconButton>
                    <ModalGroup open={open} handleClose={handleClose} />
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
                <GroupList searchResult={searchResult} />
            </Stack>
        </Stack>
    );
}

export default GroupSidebar;
