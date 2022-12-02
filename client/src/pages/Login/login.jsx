import {
    ThemeProvider,
    Typography,
    createTheme,
    Container,
    CssBaseline,
    Box,
    Avatar,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Grid,
    Snackbar,
    Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '~/redux/Auth/ApiAuth';
import { useState } from 'react';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to={'/'}>
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const checkLogin = useSelector((state) => state.auth.login);
    const [openAlert, setOpenAlert] = useState(false);

    const handleClickAlert = () => {
        setOpenAlert(true);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            data,
        });
        const user = {
            username: data.get('username'),
            password: data.get('password'),
        };
        loginUser(user, dispatch, navigate);
        handleClickAlert();
        try {
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to={'/'}>Forgot password?</Link>
                            </Grid>
                            <Grid item>
                                <Link to={'/register'}>{"Don't have an account? Sign Up"}</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
                <Snackbar
                    open={openAlert}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    autoHideDuration={5000}
                    onClose={handleCloseAlert}
                >
                    {!checkLogin.error ? (
                        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                            login a success message!
                        </Alert>
                    ) : (
                        <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
                            Active account password is not correct!
                        </Alert>
                    )}
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
}

export default Login;
