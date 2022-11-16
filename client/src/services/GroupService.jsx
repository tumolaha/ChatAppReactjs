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
