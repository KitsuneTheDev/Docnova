import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from '../../api/user.api.js';

const getLocalUser = () => {
    const local = localStorage.getItem('user') || undefined;

    if(local !== undefined) {
        return {userLocal: JSON.parse(local), isAuthLocal: true};
    } else {
        return {userLocal: null, isAuthLocal: false};
    }
}

const { userLocal, isAuthLocal } = getLocalUser();

const initialState = {
    loading: false,
    error: null,
    user: userLocal,
    isAuth: isAuthLocal,
}

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredentials, { rejectWithValue }) => {
        try{
            const response = await getUser(userCredentials);
            if(response.error) {
                return rejectWithValue(response.error);
            }
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
    reducers: {
        logout: (state) => {
            state.loading = false;
            state.error = null;
            state.user = null;
            state.isAuth = false;
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.user = null;
            state.isAuth = false;
        }).addCase(loginUser.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload;
            state.user = null;
            state.isAuth = false;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload;
            state.isAuth = true;
        })
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;