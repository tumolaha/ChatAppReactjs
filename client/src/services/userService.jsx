import * as httpRequest from '~/utils/httpRequest';

export const getAllUser = async () => {
    try {
        const res = await httpRequest.get('api/users/all');
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getFriendsUser = async (id) => {
    try {
        const res = await httpRequest.get(`api/friends/all/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};


export const getGroupUser = async (id) => {
    try {
        const res = await httpRequest.get(`api/groups/list/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const setAvatarImage = async (id, image) => {
    try {
        const res = await httpRequest.get(`api/friends/all/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};


