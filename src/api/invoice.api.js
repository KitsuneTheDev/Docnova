import ApiClient from "../utils/ApiClient.util.js";

const api = new ApiClient('/api');

export const getInvoices = async (body, token) => {
    const response = await api.post('invoice/search', body, token);
    return response;
}