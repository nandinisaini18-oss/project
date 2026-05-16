import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    profile: null,

    profileCompleted: false,

    loading: false,

    error: null
};

const userSlice = createSlice({

    name: "user",

    initialState,

    reducers: {

        setProfile: (state, action) => {

            state.profile =
                action.payload;
        },

        setProfileCompleted:
        (state, action) => {

            state.profileCompleted =
                action.payload;
        },

        setLoading: (state, action) => {

            state.loading =
                action.payload;
        },

        setError: (state, action) => {

            state.error =
                action.payload;
        },

        clearUser: (state) => {

            state.profile = null;

            state.profileCompleted = false;

            state.loading = false;

            state.error = null;
        }
    }
});

export const {

    setProfile,

    setProfileCompleted,

    setLoading,

    setError,

    clearUser

} = userSlice.actions;

export default userSlice.reducer;