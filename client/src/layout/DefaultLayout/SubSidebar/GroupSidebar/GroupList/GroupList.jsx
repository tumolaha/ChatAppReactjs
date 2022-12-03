import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

//mui
import AvatarImages from 'react-avatar-edit';
import { ExpandMore } from '@mui/icons-material';
import {
    Avatar,
    Badge,
    IconButton,
    styled,
    useTheme,
    Stack,
    Typography,
    Chip,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    Box,
    MenuItem,
    Modal,
    TextField,
    TextareaAutosize,
    Button,
} from '@mui/material';

//component
import * as serviceUser from '~/services/userService';
import * as serviceGroup from '~/services/GroupService';
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
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // height: '80%',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    // boxShadow: 24,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    pt: 2,
    px: 4,
    pb: 3,
};
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

function MultipleSelectChip1({ setMember, member }) {
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
            const res = await serviceUser.getAllUser();
            setContact(res.data);
        };
        requestApi();
    }, []);
    const handleDelete = (chipToDelete) => () => {
        setPersonName((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };
    useEffect(() => {
        const list = personName.map((item) => {
            return item?._id;
        });
        setMember(list);
    }, [personName, setMember]);
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
                                        alt={value?.username}
                                        src={value?.avatarImage}
                                    />
                                }
                                key={value?._id}
                                label={value?.username}
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
function BasicModal({ open1, setOpen1 }) {
    // const [username, setUsername] = useState(currentUser.username);
    const value = useSelector((state) => state.contact.currentContact.currentChat);
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const [id, setId] = useState('');
    const [avatarImage, setAvatarImage] = useState('')
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [member, setMember] = useState([]);
    useEffect(() => {
        if (value) {
            setId(value._id);
            setAvatarImage(value?.avatarImage)
            setName(value?.nameGroup);
            setDescription(value?.description);
            setMember(value?.member);
        }
    }, [value]);
    const handleClose = () => setOpen1(false);

    const handleEditGroup = () => {
        const apiRequest = async () => {
            const res = await serviceGroup.UpdateGroup(id,avatarImage, name, description, [currentUser._id, ...member]);
            console.log(res);
        };
        apiRequest();
        handleClose();
    };
    const [preview, setPreview] = useState(null);
    function onCloseImage() {
        setPreview(null);
    }
    function onCrop(pv) {
        setPreview(pv);
    }
    function onBeforeFileLoad(elem) {
        // if (elem.target.files[0].size > 700000) {
        //     alert('File is too big!');
        //     elem.target.value = '';
        // }
    }
    async function handleUpload() {
        const res = await serviceGroup.UpdateGroup(id, preview, name, description, [currentUser._id, ...member]);
        console.log(res.data);
        handleClose();
    }

    return (
        <>
            <Modal
                open={open1}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction={'column'} spacing={1.5}>
                        <Stack direction={'row'} spacing={1}>
                            <Typography variant="h5">edit Group</Typography>
                        </Stack>
                        <Stack direction={'column'} justifyContent="center" alignItems="center" spacing={1}>
                            <Stack direction={'row'}>
                                <Avatar src={preview ? preview : avatarImage} />
                            </Stack>
                            <Stack direction={'row'}>
                                <AvatarImages
                                    width={100}
                                    height={100}
                                    onCrop={onCrop}
                                    onClose={onCloseImage}
                                    onBeforeFileLoad={onBeforeFileLoad}
                                    src={null}
                                />
                            </Stack>
                            <Stack direction={'row'} justifyContent="space-between">
                                <Button onClick={handleUpload}>upload</Button>
                            </Stack>
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'column'} spacing={1}>
                            <Stack direction={'row'}>
                                <Typography variant="h6">Group Members</Typography>
                            </Stack>
                            <Stack direction={'row'}>
                                <MultipleSelectChip1 setMember={setMember} member={member} />
                            </Stack>
                            {/* <TextField id="outlined-basic" label="Enter Group Name" variant="outlined" /> */}
                        </Stack>
                        <Stack direction={'column'}>
                            <Typography variant="h6">Description</Typography>
                            <Stack p={1}>
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={3}
                                    maxRows={5}
                                    style={{ width: '100%' }}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} p={2} spacing={1} justifyContent="center">
                            <Button variant="contained" size="medium" onClick={handleEditGroup}>
                                edit
                            </Button>
                            <Button variant="outlined" size="medium" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}
function GroupList({ searchResult, listGroups }) {
    const dispatch = useDispatch();
    const [open1, setOpen1] = useState(false);
    const [currentSelect, seCurrentSelect] = useState(null);
    const selectCurrent = (item, index) => {
        dispatch(setCurrentContact({ currentChat: item, typeChat: 1 }));
        seCurrentSelect(index);
    };
    const handleOpen1 = () => setOpen1(true);
    const theme = useTheme();
    return (
        <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={1} width="100%" p={1}>
            <BasicModal open1={open1} setOpen1={setOpen1} />
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
                                        <Avatar src={item.avatarImage}></Avatar>
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
                                    onClick={handleOpen1}
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
