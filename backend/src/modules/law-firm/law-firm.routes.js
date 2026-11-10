import { Router } from "express";
import * as firmController from "./law-firm.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { protect } from "../../middlewares/protect.middleware.js"
import { updateFirmSchema } from "./law-firm.validation.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createUpload } from "../../middlewares/upload.middleware.js";
import { FILE_MAX_SIZES } from "../../constants/media.constants.js";

const router = Router();
const upload = createUpload({
  fields: [
    {
      name: "combinedMembersImage",
      maxCount: 1,
      maxSize: FILE_MAX_SIZES.COVER,
      types: ["image/jpeg", "image/png"],
    },
    {
      name: "locationImages",
      maxCount: 5,
      maxSize: FILE_MAX_SIZES.COVER,
      types: ["image/jpeg", "image/png"],
    },
  ],
});
router.get("/", asyncHandler(firmController.getFirm));
router.patch("/",protect(),upload, validate(updateFirmSchema), asyncHandler(firmController.updateFirm));

export default router;