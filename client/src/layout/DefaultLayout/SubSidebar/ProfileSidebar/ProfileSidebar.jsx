import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { CaretDown, DotsThreeOutlineVertical, IdentificationBadge } from 'phosphor-react';
import { useSelector } from 'react-redux';

function ProfileSidebar() {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    return (
        <>
            <Stack direction={'column'} spacing={1} p={3}>
                <Stack direction={'row'} justifyContent="space-between" alignItems="center">
                    <Typography variant="h4">My Profile</Typography>
                    <Tooltip title="edit Profile"  arrow>
                        <IconButton>
                            <DotsThreeOutlineVertical size={20} />
                        </IconButton>
                    </Tooltip>
                </Stack>
                <Stack direction={'column'} spacing={1.5} p={2} justifyContent="center" alignItems="center">
                    <Stack>
                        <Avatar  src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}/>
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
