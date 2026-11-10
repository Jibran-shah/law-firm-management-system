import { Router } from "express";
import {
  createClient,
  updateClient,
  getClient,
  getAllClients,
  deleteClient,
} from "./clients.controller.js";
import { createUpload } from "../../middlewares/upload.middleware.js";
import { FILE_MAX_SIZES } from "../../constants/media.constants.js";
import { protect } from "../../middlewares/protect.middleware.js";
import { ROLES } from "../../constants/user.constants.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { idParamSchema } from "../../schemas/params.schema.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createClientSchema,
  updateClientSchema,
  getAllClientsSchema,
} from "./clients.validation.js";

const router = Router();

const clientUpload = createUpload({
  fields: [
    {
      name: "avatar",
      maxCount: 1,
      maxSize: FILE_MAX_SIZES.AVATAR,
      types: ["image/jpeg", "image/png"],
    },
    {
      name: "cover",
      maxCount: 1,
      maxSize: FILE_MAX_SIZES.COVER,
      types: ["image/jpeg", "image/png"],
    },
  ],
});

router.post(
  "/",
  protect(ROLES.MEMBER),
  clientUpload,
  validate(createClientSchema),
  asyncHandler(createClient)
);

router.patch(
  "/:id",
  validate(idParamSchema, "params"),
  protect(ROLES.MEMBER),
  clientUpload,
  validate(updateClientSchema),
  asyncHandler(updateClient)
);

router.get(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(getClient)
);

router.get(
  "/",
  validate(getAllClientsSchema, "query"),
  asyncHandler(getAllClients)
);

router.delete(
  "/:id",
  validate(idParamSchema, "params"),
  protect(ROLES.MEMBER),
  asyncHandler(deleteClient)
);

export default router;