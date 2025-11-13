import ApiClient from "../utils/ApiClient.util.js";

const api = new ApiClient("/api");

export const getUser = async (body) => {
    const response = await api.post('/auth/login/dev', body);
    return response;
};