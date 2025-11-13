import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInvoices } from "../../api/invoice.api.js";

const initialState = {
    loading: false,
    error: null,
    invoices: null,
}

export const fetchInvoices = createAsyncThunk(
    'invoices/getInvoices',
    async (body, { getState, rejectWithValue } ) => {
        try {
            const userState = getState().userReducer;
            const token = userState?.user.jwt;
            console.log(userState.user);

            if(!token) {
                throw new Error("Authentication token not found.");
            }

            console.log(token);
            console.log(userState.user.companies[0].id);

            const bodyWithId = {
                ...body,
                companyId: userState.user?.companies[0]?.id,
            };

            console.log("bodyWithId -->", bodyWithId);

            const response = await getInvoices(bodyWithId, token);
            if(response.error) {
                return rejectWithValue(response.error);
            }
            return response;
        } catch(error) {
            const errorMessage = error.response?.data?.message || error.message || 'Get Invoices Error';
            return rejectWithValue(errorMessage);
        }
    } 
);

export const invoiceSlice = createSlice({
    name: "invoices",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchInvoices.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.invoices = null;
        }).addCase(fetchInvoices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.invoices = null;
        }).addCase(fetchInvoices.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.invoices = action.payload;
        });
    }
});

export default invoiceSlice.reducer;