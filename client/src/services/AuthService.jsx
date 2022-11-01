import * as httpRequests from '~/utils/httpRequest';
import httpRequest from '~/utils/httpRequest';
export const login = async (username, password) => {
    try {
        const res = await httpRequest.post(`/api/auth/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const register = async (firstName, lastName, username, email, password) => {
    try {
        const res = await httpRequests.post('/api/auth/register', {
            firstName,
            lastName,
            username,
            email,
            password,
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};
