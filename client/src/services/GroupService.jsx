import * as httpRequest from '~/utils/httpRequest';

export const CreateGroup = async (name, description, member = [], create) => {
    try {
        const res = await httpRequest.post('api/groups/add', {
            name,
            description,
            member,
            create,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};


export const UpdateGroup = async (id, avatarImage, nameGroup, description, member = []) => {
    try {
        const res = await httpRequest.post('api/groups/update', {
            id,
            avatarImage,
            nameGroup,
            description,
            member,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};


export const getGroupAll = async () => {
    try {
        const res = await httpRequest.get('api/groups/all');
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const SearchGroup = async (keyword) => {
    try {
        const res = await httpRequest.get('api/groups/search',{
            params: {
                keyword: keyword
            }
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};