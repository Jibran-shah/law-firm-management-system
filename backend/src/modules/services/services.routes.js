import { Router } from "express";
import {
  createService,
  updateService,
  getService,
  getAllServices,
  deleteService,
} from "./services.controller.js";
import { createUpload } from "../../middlewares/upload.middleware.js";
import { FILE_MAX_SIZES } from "../../constants/media.constants.js";
import { protect } from "../../middlewares/protect.middleware.js";
import { ROLES } from "../../constants/user.constants.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { idParamSchema } from "../../schemas/params.schema.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createServiceSchema,
  updateServiceSchema,
  getAllServicesSchema,
} from "./services.validation.js";

const router = Router();

const serviceUpload = createUpload({
  fields: [
    {
      name: "image",
      maxCount: 1,
      maxSize: FILE_MAX_SIZES.COVER,
      types: ["image/jpeg", "image/png"],
    },
  ],
});

router.post(
  "/",
  protect(ROLES.MEMBER),
  serviceUpload,
  validate(createServiceSchema),
  asyncHandler(createService)
);

router.patch(
  "/:id",
  validate(idParamSchema, "params"),
  protect(ROLES.MEMBER),
  serviceUpload,
  validate(updateServiceSchema),
  asyncHandler(updateService)
);

router.get(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(getService)
);

router.get(
  "/",
  validate(getAllServicesSchema, "query"),
  asyncHandler(getAllServices)
);

router.delete(
  "/:id",
  validate(idParamSchema, "params"),
  protect(ROLES.MEMBER),
  asyncHandler(deleteService)
);

export default router;