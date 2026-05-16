import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Preferences from "../features/user/pages/Preferences";
import Profile from "../features/user/pages/Profile";
import EditProfile from "../features/user/pages/EditProfile";
import MainLayout from "../layout/MainLayout";

export const routes = createBrowserRouter([
    {
        element : <MainLayout />,
        children : [
            {
                path: "/",
                element: <h1>Hello</h1>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/preferences",
                element: <Preferences />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/editProfile",
                element: <EditProfile />
            }
        ]
    }
])