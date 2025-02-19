import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/types/user';
import { signOutApi } from '@/api/apiRoute';

interface UserState {
    userProfile: IUser | null;
}

const initialState: UserState = {
    userProfile: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.userProfile = action.payload;
        },
        removeUser: (state) => {
            state.userProfile = null;
            signOutApi();
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;