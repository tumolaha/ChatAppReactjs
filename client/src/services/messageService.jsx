import * as httpRequest from '~/utils/httpRequest';

export const getMessageFriends = async (from, to) => {
    try {
        const res = await httpRequest.get('api/messages/contact', {
            params: {
                from,
                to,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addMessageFriends = async (from, to, message) => {
    try {
        await httpRequest.post('api/messages/contact/add', {
            from,
            to,
            message,
        });
    } catch (error) {
        console.log(error);
    }
};

export const getMessageGroup = async (groupId) => {
    try {
        const res = await httpRequest.get('api/messages/group/get', {
            params: {
                groupId,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addMessageGroups = async (groupId, sender, users, message) => {
    try {
        await httpRequest.post('api/messages/group/add', {
            groupId,
            users,
            sender,
            message,
        });
    } catch (error) {
        console.log(error);
    }
};
