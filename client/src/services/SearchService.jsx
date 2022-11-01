import * as httpRequest from '~/utils/httpRequest';

export const searchUser = async (keyword, limit = 10) => {
    try {
        const res = await httpRequest.get('api/users/search', {
            params: {
                keyword,
                limit,
            },
            
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
