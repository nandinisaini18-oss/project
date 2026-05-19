import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : null,
        loading : false,
        error : null
    },
    reducers : {
        setProfile : (state , action) => {
            state.user = action.payload
        },
        setLoading : (state , action) => {
            state.loading = action.payload
        },
        setError : (state , action) => {
            state.error = action.payload
        },
    }
})

export const {setProfile , setLoading , setError} = authSlice.actions
export default authSlice.reducer