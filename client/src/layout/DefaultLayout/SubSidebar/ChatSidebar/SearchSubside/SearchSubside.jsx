import { useEffect, useState } from 'react';
//hook
import useDebounce from '~/hooks/useDebounce';
//component ui
import {  InputBase, styled } from '@mui/material';

//api
import * as Services from '~/services/userService';
import { useSelector } from 'react-redux';
import { MagnifyingGlass } from 'phosphor-react';

const SearchStyle = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(230,235,245,1) !important',
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(0),
        width: '100%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.info.dark,
    fontSize: '1.2rem',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '100%',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function SearchSubsider({ setSearchResult }) {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [userValue, setUserValue] = useState('');
    const [loading, setLoading] = useState(false);
    const debouncedValue = useDebounce(userValue, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const listFriends = await Services.getFriendsUser(user._id);
            // const listFriends = []
            let listSearchFriends = listFriends.data.user.filter((e) => e === debouncedValue);
            console.log(listSearchFriends);
            setSearchResult(listSearchFriends);
            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);

    const handleChange = (e) => {
        const searchValueTmp = e.target.value;
        if (!searchValueTmp.startsWith(' ')) {
            setUserValue(searchValueTmp);
        }
    };
    return (
        <>
            {/* <Tippy
                interactive
                placement="bottom"
                visible={searchResult.length > 0 && showResult}
                render={(attrs) => (
                    <Box
                        {...attrs}
                        tabIndex="-1"
                        sx={{
                            backgroundColor: theme.palette.common.white,
                            boxShadow: theme.shadows[4],
                            padding: theme.spacing(1),
                            borderRadius: '10px',
                            width: '300px',
                        }}
                    >
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {searchResult.map((item) => {
                                return (
                                    <ListItem key={item._id}  sx={{
                                        borderRadius:'10px',
                                        ":hover":{
                                        background: theme.palette.secondary.light
                                    }}}>
                                        <ListItemAvatar>
                                            <Avatar src={`data:image/svg+xml;base64,${item.avatarImage}`}>
                                                
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={`${item.first_name + " "+ item.last_name}`} secondary={`${item.username}`} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                )}
                onClickOutside={handleClose}
            > */}
            <SearchStyle>
                <SearchIconWrapper>
                    <MagnifyingGlass size={20} />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={userValue}
                    onChange={handleChange}
                />
            </SearchStyle>
            {/* </Tippy> */}
        </>
    );
}

export default SearchSubsider;
