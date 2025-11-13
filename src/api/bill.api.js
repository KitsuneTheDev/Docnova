import ApiClient from "../utils/ApiClient.util.js";

const api = new ApiClient('https://api-dev.docnova.ai/');

export const getBills = async (body) => {
    const response = await api.post('invoice/search', body);
    return response;
}