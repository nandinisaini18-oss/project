import { Router } from "express";
import multer, { memoryStorage } from "multer"

const upload = multer({storage : memoryStorage()})


import authenticateUser
from "../middlewares/auth.middleware.js";

import {
    getProfile,
    updateProfile,
    updatePreferences
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get(
    "/profile",
    authenticateUser,
    getProfile
);

userRouter.patch(
    "/profile",
    authenticateUser,
    upload.single("profilePicture"),
    updateProfile
);

userRouter.patch(
    "/preferences",
    authenticateUser,
    updatePreferences
);

export default userRouter;