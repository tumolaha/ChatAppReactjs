// import { ConfigRouter } from '~/config';
import * as services from '~/services/AuthService';
import {
    loginStart,
    loginSuccess,
    logOutFailed,
    logOutStart,
    logOutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from './AuthSlice';


//login password
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await services.login(user.username, user.password);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (error) {}
};
//register password
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await services.register(user.firstName, user.lastName, user.username, user.email, user.password);
        dispatch(registerSuccess());
        navigate('/');
    } catch {
        dispatch(registerFailed());
    }
};

export const logOutUser = async (dispatch, navigate) => {
    dispatch(logOutStart());
    try {
        // await services.logout('users/signOut');
        dispatch(logOutSuccess());
        navigate('/');
    } catch {
        dispatch(logOutFailed());
    }
};

