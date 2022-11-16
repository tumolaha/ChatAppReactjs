import { useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';

import * as serviceUser from '~/services/userService';
import * as servicesGroup from '~/services/GroupService';
import { v4 as uuidv4 } from "uuid";

import {
    Avatar,
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Stack,
    OutlinedInput,
    Select,
    TextareaAutosize,
    TextField,
    Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: '80%',
    overflow: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '10px',
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

export function MultipleSelectChip({ setMember }) {
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
            return item._id;
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
const ModalGroup = ({ open, handleClose, listGroups, setListGroups }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [member, setMember] = useState([]);
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const clearInput = () => {
        setName('');
        setDescription('');
        setMember([]);
    };
    const handleCreateGroup = async () => {
        const res = await servicesGroup.CreateGroup(name, description, member, currentUser._id);
        console.log(res);
        const list = listGroups;
        const group = {
            _id: uuidv4(),
            nameGroup: name,
            avatarImage:
                'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMzEgMjMxIj48cGF0aCBkPSJNMzMuODMsMzMuODNhMTE1LjUsMTE1LjUsMCwxLDEsMCwxNjMuMzQsMTE1LjQ5LDExNS40OSwwLDAsMSwwLTE2My4zNFoiIHN0eWxlPSJmaWxsOiNhNTAwMDA7Ii8+PHBhdGggZD0ibTExNS41IDUxLjc1YTYzLjc1IDYzLjc1IDAgMCAwLTEwLjUgMTI2LjYzdjE0LjA5YTExNS41IDExNS41IDAgMCAwLTUzLjcyOSAxOS4wMjcgMTE1LjUgMTE1LjUgMCAwIDAgMTI4LjQ2IDAgMTE1LjUgMTE1LjUgMCAwIDAtNTMuNzI5LTE5LjAyOXYtMTQuMDg0YTYzLjc1IDYzLjc1IDAgMCAwIDUzLjI1LTYyLjg4MSA2My43NSA2My43NSAwIDAgMC02My42NS02My43NSA2My43NSA2My43NSAwIDAgMC0wLjA5OTYxIDB6IiBzdHlsZT0iZmlsbDojQzc4NzNBOyIvPjxwYXRoIGQ9Im0xMTUuNSAyMzFhMTE1IDExNSAwIDAgMCA2NC4yMy0xOS41IDExNC43OSAxMTQuNzkgMCAwIDAtMzgtMTYuNWwtMi40MS05YTEyNS4xOSAxMjUuMTkgMCAwIDAtMTMuMzItMi4yOHY4Ljc1cTMuNTIgMC4zMiA3IDAuODRsLTE3LjUgMTcuNDgtMTcuNS0xNy40OHEzLjQ1LTAuNTIgNy0wLjg0di04Ljc1YTEyNS41NSAxMjUuNTUgMCAwIDAtMTMuMzQgMi4yOGwtMi40MSA5YTExNC43OSAxMTQuNzkgMCAwIDAtMzggMTYuNSAxMTQuOTQgMTE0Ljk0IDAgMCAwIDY0LjI1IDE5LjV6IiBzdHlsZT0iZmlsbDojZWUyODI5OyIvPjxwYXRoIGQ9Im0xMzIuOTggMTkzLjMzLTM2LjE4NSAzNi4xNTUtMi40LTAuNDIgMzYuMTA4LTM2LjA4MXoiIHN0eWxlPSJmaWxsOiNmZjA7Ii8+PHBhdGggZD0ibTEwOC4zNyAyMi4wMTljLTYuMjY5OC0xMi44MjktMTcuMTUxLTEzLjM5Ni0xOC45NDkgMS4xNzY5LTExLjQ0OC05LjQ1ODMtMjYuMDIxLTQuNDgzLTIwLjM2MSAxMi40MjItMTIuMjUxLTcuOTI4Mi0yNC45MTkgMS43NzYxLTE3LjA3NiAyMC44NTMtMjcuMDggMi4zNjQ2LTIyLjcxNSAyNC43MjYtMTAuMTExIDMxLjQzNS05LjkwMDIgMy4zNTY2LTEwLjcwMSA5LjQwMDYtOC40NjQgMTQuNDk3IDIuNjU3NCA0Ljc4NDIgOS4wMTI2IDYuNDczNyAxMS41NDUgOS42NTE5LTYuNjI0IDAuNTk0MTktOC40MTEyIDUuNjAxMS01Ljc0MDQgOS41MTkyIDEuNjg5NiAyLjQ3ODcgNS4yNzU2IDQuMjIxOCA4LjU5NzEgNS41NDU1IDEuMDQ4NSAwLjQwNjU4IDMuNzAyIDEuMjczMiAzLjkwNTMgMi40MTgxIDAuMTg3NDQgMS4yMTU2LTYuNzg4NCAzLjAwNTUtNS43MjgxIDUuMjYxMiAwLjYwNjQ4IDEuNDIyNyAxLjc3NjQgMi43MTUxIDIuNjQ2NiAzLjcxNTYgMS4yODA3IDEuNjU5NSAxMC43NTUgOC4wMzUxIDkuNDU4MyA0LjIwNDktMS4wMjcxLTMuNzIzNC0yLjIxNDgtNy40NjgyLTMuMTQ1Ni0xMS4xOTItMS4xNjYyLTUuMzA2OS0xLjc4NjgtMTAuNzIxLTEuMTAyLTE2LjE1NiAxLjQyMjMtNS40NTUgNS4wNjktNC40MjY1IDcuNzgzNy04LjM1ODggMy41MjY0LTUuNzUwNSAyLjAyOTYtMTEuNjE0IDIuMTI0LTEzLjU3NSAwLjEwNy0xLjc4NjggMS41NDA3LTEuMTg3NiAzLjE4ODQtMS40MzM3IDQuMzg2OC0wLjY0MTk2IDcuMDA4MS0yLjExODUgOC44Mzc3LTYuMjY5OCAwLjc3MDM1LTEuOTI1OSAwLjYyMDU3LTkuNzU3OCAwLjUyNDI2LTExLjc4IDAuMzYzNzgtNC42MzI4IDQuMTgzNSAwIDYuNTQ4IDAuNjQxOTYgMy4yNjMzIDAuODg4MDUgNi44Nzk3IDAuMjEzOTkgOS4wNzMxLTIuNTAzNyAxLjc1NDctMi4zNzUzIDIuMDg2NC0yLjg4ODggNC42MTE0LTAuODAyNDUgMi42ODU2IDIuMjE0OCA0LjA5NzkgMy4xMzQ5IDcuNjkyOSAzLjI3NCA1LjU2MzcgMC4yMDMyOSA4Ljc3MzUtNi4yNjk4IDExLjMyLTUuNjM4NiAzLjUyMDEgMC44NzczNSAzLjYwNTcgNS40NTY3IDEwLjI2MSA0Ljg2ODIgMi4zODYtMC4yMDMyOSAzLjgzMDQtMC44NjY2NSA1LjQwMzItMi42NDI4IDAuODg4MDUtMC45OTUwNSAxLjk1OC0yLjUwMzcgMy40MzQ1LTIuNjIxNCAxLjQ2NTgtMC4xMTc3IDIuMzIxOCAyLjM2NDYgMy4wMDY1IDMuNDQ1MiAxLjE5MjYgMi42NzU1IDQuMDI5NSAzLjY1MTMgNi4yMzc3IDMuMzE2OCAxLjk1OC0wLjE3MTE5IDMuODU0LTEuNDExNSA1LjQyNjgtMi40NzA3IDAuOTk2NzktMC42NjEwMiAxLjgyODQtMC44MTEyOCAxLjkyNTYgMC4yMDcxIDAuMjk1OTIgMi4yMjcxIDAuMDg2MiA3LjcwMjUgMC4xNTk2IDguNDgyMSAwLjEwNTU2IDguNDYwOSA1LjM3IDEwLjU2OSAxMy4yMjMgMTAuMzMzLTAuMzE4NzEgMy43NDY0IDAuMDU4MyAxMS4yOCA1LjQzNTMgMTQuNTYyIDMuOTQ4MSAyLjc2MDQgNi42NjU3IDEuMjczMiA2LjcyOTkgNy44NTM0IDdlLTMgNi4xOTE0LTAuNDM2OTMgMTMuMDYxLTEuMjk0NiAxOC4xODktMC42OTU0NyA0LjA0NDQtMS4yNDEyIDYuNDgzOC0yLjUyNTEgMTAuMzc4LTAuNjQxOTYgMS45MTUyLTAuODEzMTUgMS45Njg3IDEuNDEyMyAxLjA2OTkgNy4xNDcyLTMuMTQ1NiAxMC41MzktMTEuNDggOC4zNTYyLTE4Ljg0Mi0wLjQzODY5LTIuMDQzNiAwLjg0NTI1LTEuNzIyNiAyLjg3ODEtMi42MTA2IDkuNTI0OC00LjIzNjMgOC4xMjY0LTExLjMzNS0wLjc1OTY3LTE0LjI3MyAxMS45ODgtMy4wOTI2IDEzLjg4Ni04LjkwMDIgNi42ODcxLTE1LjM3NSA3LjMwNzctNS45MTY4IDMuNjM3OC0xNi4xNzctMi44MDMyLTE2Ljk5MSAxMi40MjItNy4wOTM3IDUuNzM0OS0yMi4wNjItNS4xMDM2LTE4LjQ5OSA0LjE3MjgtMTIuMDM3LTUuNTYzNy0yNi4yMDMtMjEuMTIxLTE2Ljg5NCA2Ljk2NTMtMTEuMzczIDIuMDY1LTIyLjY2MS0xMi4xMDEtMTAuNzg1LTMuNDU1OS0xOC4zODItMTUuMTQtMTYuNTg0LTIzLjkwMi01LjAxOCAwLjA5NDM1LTIwLjA3NS0xNi4wMDEtMTcuNDItMTguMTQ2LTIuNTg5MnoiIHN0eWxlPSJmaWxsOiNkZTNiMDA7Ii8+PHBhdGggZD0ibTUuNDM1MyA4MC41MDJjNy40NDY4IDkuMTM3MyAxNS42MzIgOC44OTEyIDE1LjYzMiA4Ljg5MTJzLTYuMDc3MiAzLjc5ODMtNi44MzY5IDkuODc1NWMtMC43NTk2NiA2LjA4OCA0LjU1NzkgOS42Mjk1IDguMDk5NCAxMC42NDYgMy41NTIyIDEuMDA1OCA3LjA5MzctMi43OTI1IDcuMDkzNy0yLjc5MjVzLTUuODMxMiAxMC42NDYtMS41MTkzIDE1Ljk2NGM0LjMwMTIgNS4zMTc2IDExLjkwOCAzLjAzODYgMTEuOTA4IDMuMDM4NnMtNS4zMjgzIDEwLjEzMiAxLjAwNTcgMTQuMTg3YzUuODMxMiAzLjcyMzQgMTguNTQyIDcuNjcxNSAyMC41MTEgOC4yNzA2LTYuMDY2Ni05Ljc0NzItOS41NzYtMjEuMjQ5LTkuNTc2LTMzLjU3NXYtMC4wNDI4YzAtMzUuMjAxIDI4LjU0Ni02My43NDcgNjMuNzQ3LTYzLjc0NyAzNS4yMTIgMCA2My43NTggMjguNTQ2IDYzLjc1OCA2My43NDcgMCAxMi40NzYtMy41ODQzIDI0LjExNi05Ljc4OTkgMzMuOTQ5aDAuNTM0OTZzMTMuOTMxLTEuMDA1NyAxNi4yMS05LjM3MjdjMi4yNzktOC4zNTYyIDAuNzU5NjctOS44NzU2IDAuNzU5NjctOS44NzU2czEwLjYzNSAyLjAzMjkgMTMuNDE3LTcuNTk2NmwyLjc5MjYtOS42Mjk1czEwLjEzMiAwIDEwLjg5Mi03LjA4M2MwLjc1OTYzLTcuMDkzNy03LjAyOTUtMTIuNDExLTcuMDI5NS0xMi40MTFzMTEuNDU5IDAuODIzODUgMTQuNDk4LTEwLjQ1M2MxLjAxNjQtMy43NTU1IDAuODM0NTYtOC4yMTcxIDAuMTM5MS0xMi40OTctMTcuNjY1LTQxLjE2MS01OC41NjktNjkuOTk1LTEwNi4xOC02OS45OTUtMzAuNjMyIDAtNjAuMDM0IDEyLjE4Ny04MS42NzkgMzMuODMxdjAuMDEwN2MtMTMuMTcxIDEzLjE3MS0yMi44MzMgMjkuMjItMjguMzg2IDQ2LjY2eiIgc3R5bGU9ImZpbGw6bm9uZTsiLz48cGF0aCBkPSJtOTEuNzIgOTcuMzZ2MTEuNG00Ny41Ni0xMS40djExLjQiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDo3Ljk5OTlweDtzdHJva2U6IzAwMDsiLz48cGF0aCBkPSJtMTE1LjUgMTUzLjkzYTE0IDE0IDAgMCAxLTEwLjUtNC42OSAzLjQyMDkgMy40MjA5IDAgMCAxIDUtNC42N2wwLjA4IDAuMDggMC4wOCAwLjA5YTcuMzUgNy4zNSAwIDAgMCAxMC4zOSAwLjM3bDAuMzctMC4zN2EzLjQyMDYgMy40MjA2IDAgMSAxIDUuMjMgNC40MWwtMC4wOCAwLjA5YTE0IDE0IDAgMCAxLTEwLjUzIDQuNjl6IiAvPjxwYXRoIGQ9Im0xMTUuMjcgMTI3LjMyYy03LjY2MjctMC4wMy0xNS4yNTEgMS40NDE5LTIwLjY0NiA1LjE0NjUtNy42MiA1LjMzLTkuOTA1MyAxMS41MTItMTQuMTI3IDE4LjEwOS0zLjQzNzkgNS4yNDQ3LTkuMzI2IDEwLjAyNC0xMy40NjcgNi4zMzQgMjUuNDI1IDI5Ljc1NSA3MS40MDkgMjkuNzg2IDk2Ljg3NSAwLjA2NjQtNi44MTA0IDMuOTMwNS0xMS41NDUtMi40Ny0xMy41MDgtNi40MDA0LTEwLjY5Ny0xNy42MDUtMTQuMTE1LTIyLjY1Ni0zNS4xMjctMjMuMjU2em0tMC4yNjc1OCA4LjM5ODRjNy40NTcgMC4wODAyIDE0Ljk4NiAxLjI5NjYgMTcuMTQ2IDUuOTUyMiAyLjU3NjUgMTEuMzE5LTcuNTg3OCAxNy40NTQtMTYuNjgxIDE3LjUxNS02LjA5LTAuMDUtMTIuMi0yLjM4MDItMTUuMjYtNy43NDAyLTYuMzYtMTEuMTYgMy42MzQ5LTE1LjYwNyAxNC43OTUtMTUuNzI3eiIgc3R5bGU9ImZpbGw6IzRhMzczNzsiLz48L3N2Zz4',
            description: description,
            member: member,
            create: currentUser._id,
        };

        setListGroups([...list, group]);
        clearInput();
        handleClose();
    };
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
                            <MultipleSelectChip setMember={setMember} />
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
                        <Button variant="contained" size="medium" onClick={handleCreateGroup}>
                            Create
                        </Button>
                        <Button variant="outlined" size="medium" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
};

export default ModalGroup;
