import { useEffect, useState } from 'react';
//hook
import useDebounce from '~/hooks/useDebounce';
//component ui
import {Search } from '@mui/icons-material';
import {
    alpha,
    Avatar,
    Box,
    InputBase,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    styled,
    useTheme,
} from '@mui/material';
import Tippy from '@tippyjs/react/headless';

//api
import * as searchServices from '~/services/SearchService';

const SearchStyle = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.secondary.main, 0.35),
    '&:hover': {
        backgroundColor: alpha(theme.palette.secondary.dark, 0.25),
    },
    marginLeft: 0,
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

function SearchSubsider() {
    const [userValue, setUserValue] = useState('');

    const [showResult, setShowResult] = useState(true);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(userValue, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const listUsers = await searchServices.searchUser(debouncedValue);
            
            setSearchResult(listUsers);
            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);

    const handleClick = (event) => {
        setShowResult(true);
    };
    const handleClose = () => {
        setShowResult(false);
        
    };
    const handleChange = (e) => {
        const searchValueTmp = e.target.value;
        if (!searchValueTmp.startsWith(' ')) {
            setUserValue(searchValueTmp);
        }
    };
    const theme = useTheme();
    return (
        <>
            <Tippy
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
            >
                <SearchStyle>
                    <SearchIconWrapper>
                        <Search />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={userValue}
                        onChange={handleChange}
                        onClick={handleClick}
                        onFocusCapture={handleClose}
                    />
                </SearchStyle>
            </Tippy>
        </>
    );
}

export default SearchSubsider;
