import { Router } from "express";

import { protect } from "../../middlewares/protect.middleware.js";
import { getMe, login, logout, register } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "./auth.validaton.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.post("/signup",validate(registerSchema),asyncHandler(register));

router.post("/login",validate(loginSchema), asyncHandler(login));

router.post("/logout", asyncHandler(logout));

router.get("/me", protect,asyncHandler(getMe));

export default router;