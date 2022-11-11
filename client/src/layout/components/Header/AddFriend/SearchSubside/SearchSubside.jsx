import { useEffect, useState } from 'react';
//hook
import useDebounce from '~/hooks/useDebounce';
//component ui
import { Search } from '@mui/icons-material';
import {
    alpha,
    InputBase,
    styled,
    useTheme,
} from '@mui/material';

//api
import * as searchServices from '~/services/SearchService';

const SearchStyle = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.light, 0.35),
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.dark, 0.25),
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

function SearchSubsider({ setSearchResult }) {
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
            const listUsers = await searchServices.searchUser(debouncedValue);
            setSearchResult(listUsers);
            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);

    function handleChange(e) {
        const searchValueTmp = e.target.value;
        if (!searchValueTmp.startsWith(' ')) {
            setUserValue(searchValueTmp);
        }
    }
    return (
        <>
            <SearchStyle>
                <SearchIconWrapper>
                    <Search />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={userValue}
                    onChange={handleChange}
                />
            </SearchStyle>
        </>
    );
}

export default SearchSubsider;
