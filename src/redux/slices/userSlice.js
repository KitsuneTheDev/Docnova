import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from '../../api/user.api.js';

const initialState = {
    loading: false,
    error: null,
    user: null,
}

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredentials, { rejectWithValue }) => {
        try{
            const response = await getUser(userCredentials);
            localStorage.setItem('user', JSON.stringify(response));
            return response;
        } catch(error) {
            const errorMessage = error.response?.data?.message || error.message || 'Login Error';
            return rejectWithValue(errorMessage);
        }
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.user = null;
        }).addCase(loginUser.rejected, (state, action) => {
            state.loading = false,
            state.error = action.error.message;
            state.user = null;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload;
        })
    }
});

export default userSlice.reducer;