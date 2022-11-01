import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // paramsSerializer: (params) => querystring.stringify(params),
});
// httpRequest.interceptors.response.use(
//     (response) => {
//         if (response && response.data) {
//             return response.data;
//         }
//         return response;
//     },
//     (error) => {
//         throw error;
//     },
// );
export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};
export const post = async (path, options = {}) => {
    const response = await httpRequest.post(path, options);
    console.log(response);
    return response.data;
};
export default httpRequest;
