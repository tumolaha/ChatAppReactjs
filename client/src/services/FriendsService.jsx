import * as httpRequest from '~/utils/httpRequest';

export const SendRequestFriends = async (from, to) => {
    try {
        const res = await httpRequest.post(`api/friends/add?from=${from}&to=${to}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const AcceptFriends = async (from, to) => {
    try {
        const res = await httpRequest.post(`api/friends/accept?from=${from}&to=${to}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const UnFriends = async (from, to) => {
    try {
        const res = await httpRequest.post(`api/friends/unfriends?from=${from}&to=${to}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};