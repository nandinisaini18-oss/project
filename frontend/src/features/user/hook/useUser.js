import { useDispatch, useSelector } from "react-redux";

import { updatePreferences, getProfile, updateProfile} from "../service/user.api";

import { setProfile, setProfileCompleted, setLoading, setError} from "../state/user.slice";

export function useUser() {

    const dispatch = useDispatch();

    const loading = useSelector(
        (state) => state.user.loading
    );

    async function handleGetProfile() {

        try {

            dispatch(setLoading(true));
            const response = await getProfile();
            dispatch(setProfile(response.user));

            return response;

        } catch(err) {

            dispatch(
                setError(err.response?.data?.message)
            );

            console.log(err);

        } finally {

            dispatch(setLoading(false));
        }
    }

    async function handleUpdatePreferences(data) {

        try {

            dispatch(setLoading(true));

            const response =
                await updatePreferences(data);

            dispatch(
                setProfile(response.user)
            );

            dispatch(
                setProfileCompleted(true)
            );

            return response;

        } catch(err) {

            dispatch(
                setError(err.response?.data?.message)
            );

            console.log(err);

        } finally {

            dispatch(setLoading(false));
        }
    }

    async function handleUpdateProfile(data) {

        try {

            dispatch(setLoading(true));

            const response =
                await updateProfile(data);

            dispatch(
                setProfile(response.user)
            );

            return response;

        } catch(err) {

            dispatch(
                setError(err.response?.data?.message)
            );

            console.log(err);

        } finally {

            dispatch(setLoading(false));
        }
    }

    return {

        loading,

        handleGetProfile,

        handleUpdatePreferences,

        handleUpdateProfile
    };
}