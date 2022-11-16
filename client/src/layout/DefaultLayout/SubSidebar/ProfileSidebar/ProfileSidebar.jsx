import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Button,
    IconButton,
    Modal,
    Stack,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { CaretDown, DotsThreeOutlineVertical, IdentificationBadge } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {editProfile} from '~/redux/Auth/AuthSlice';

import * as services from '~/services/AuthService';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // height: '80%',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
const ModelEditProfile = ({ open, handleClose }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const [firstName, setFirstName] = useState(currentUser.first_name);
    const [lastName, setLastName] = useState(currentUser.last_name);

    // const [username, setUsername] = useState(currentUser.username);
    const [email, setEmail] = useState(currentUser.email);
    const [phone, setPhone] = useState(currentUser.phone);
    const [location, setLocation] = useState(currentUser.location);


    const apiRequest = async () => {
        const res = await services.editProfile(currentUser._id, firstName, lastName, email, location, phone);
        console.log(res.data);
        dispatch(editProfile(res.data))
        handleClose();
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h5">Edit Profile</Typography>
                        <Stack direction={'column'} justifyContent="center" alignItems="center">
                            <Avatar />
                        </Stack>
                        <Stack direction={'column'}>
                            <Typography variant="h6">First Name</Typography>
                            <TextField
                                id="filled-basic"
                                label="First Name"
                                variant="filled"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                            />
                        </Stack>
                        <Stack direction={'column'}>
                            <Typography variant="h6">Last Name</Typography>
                            <TextField
                                id="filled-basic"
                                label="Last Name"
                                variant="filled"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                            />
                        </Stack>
                        {/* <Stack direction={'column'}>
                            <Typography variant="h6">User Name</Typography>
                            <TextField
                                id="filled-basic"
                                label="User Name"
                                variant="filled"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Stack> */}
                        <Stack direction={'column'}>
                            <Typography variant="h6">Email</Typography>
                            <TextField
                                id="filled-basic"
                                label="Email"
                                variant="filled"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </Stack>
                        <Stack direction={'column'}>
                            <Typography variant="h6">Phone</Typography>
                            <TextField
                                id="filled-basic"
                                label="Phone"
                                variant="filled"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                            />
                        </Stack>
                        <Stack direction={'column'}>
                            <Typography variant="h6">Location</Typography>
                            <TextField
                                id="filled-basic"
                                label="Location"
                                variant="filled"
                                onChange={(e) => setLocation(e.target.value)}
                                value={location}
                            />
                        </Stack>
                        <Stack direction={'row'} spacing={1} p={1} justifyContent="center" alignItems="center">
                            <Button variant="contained" sx={{ backgroundColor: theme.palette.primary.light }} onClick={apiRequest}>
                                Save Profile
                            </Button>
                            <Button variant="outlined" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
};

function ProfileSidebar() {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Stack direction={'column'} spacing={1} p={3}>
                <Stack direction={'row'} justifyContent="space-between" alignItems="center">
                    <Typography variant="h4">My Profile</Typography>
                    <Tooltip title="edit Profile" arrow>
                        <IconButton onClick={handleOpen}>
                            <DotsThreeOutlineVertical size={20} />
                        </IconButton>
                    </Tooltip>
                    <ModelEditProfile open={open} handleClose={handleClose} />
                </Stack>
                <Stack direction={'column'} spacing={1.5} p={2} justifyContent="center" alignItems="center">
                    <Stack>
                        <Avatar src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} />
                    </Stack>
                    <Stack>
                        <Typography variant="h6">{currentUser.first_name + ' ' + currentUser.last_name}</Typography>
                    </Stack>
                    <Stack direction={'row'}>
                        <Box
                            sx={{
                                width: '10px',
                                height: '10px',
                                border: '4px solid rgb(6,214,160)',
                                marginRight: '10px',
                                borderRadius: '5px',
                            }}
                        ></Box>
                        <Typography>Active</Typography>
                    </Stack>
                </Stack>
                <Stack>
                    <Typography variant="body1">{currentUser.deception}</Typography>
                </Stack>
                <Stack direction={'column'} spacing={1}>
                    <Stack direction={'row'} p={1} width={'100%'}>
                        <Accordion sx={{ width: '100%' }}>
                            <AccordionSummary
                                expandIcon={<CaretDown size={20} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Stack direction={'row'} alignItems="center">
                                    <IdentificationBadge size={15} />
                                    <Typography>About</Typography>
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails sx={{ width: '100%' }}>
                                <Stack direction={'column'} spacing={1} width="100%">
                                    <Stack direction={'column'} width={'100%'}>
                                        <Typography variant="h6"> Name</Typography>
                                        <Typography variant="body1">
                                            {currentUser.first_name + ' ' + currentUser.last_name}
                                        </Typography>
                                    </Stack>
                                    <Stack direction={'column'}>
                                        <Typography variant="h6">User Name</Typography>
                                        <Typography variant="body1">{currentUser.username}</Typography>
                                    </Stack>
                                    <Stack direction={'column'}>
                                        <Typography variant="h6">Email</Typography>
                                        <Typography variant="body1">
                                            {currentUser.email ? currentUser.email : 'add information'}
                                        </Typography>
                                    </Stack>
                                    <Stack direction={'column'}>
                                        <Typography variant="h6">Location</Typography>
                                        <Typography variant="body1">
                                            {currentUser.location ? currentUser.location : 'add information'}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    </Stack>
                    {/* <Stack direction={'row'} p={1}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<CaretDown size={20} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Accordion 1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                                    ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Stack> */}
                </Stack>
            </Stack>
        </>
    );
}

export default ProfileSidebar;
