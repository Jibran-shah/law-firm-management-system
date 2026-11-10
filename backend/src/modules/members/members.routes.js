import { Router } from "express"
import { createUpload } from "../../middlewares/upload.middleware.js";
import { FILE_MAX_SIZES } from "../../constants/media.constants.js";
import { protect } from "../../middlewares/protect.middleware.js"
import { ROLES } from "../../constants/user.constants.js";
import { asyncHandler } from "../../utils/asyncHandler.js"
import { 
  createMember, 
  getAllMembers, 
  getMemberById, 
  updateMember 
} from "./members.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createMemberSchema, updateMemberSchema } from "./members.validation.js";
import { parseMemberFormData } from "./members.middlewares.js";
import { idParamSchema } from "../../schemas/params.schema.js";

const router = Router();

const upload = createUpload({
    fields:[
      {
        name: "avatar",
        maxCount: 1,
        maxSize: FILE_MAX_SIZES.AVATAR,
        types: ["image/jpeg", "image/png"]
      },
      {
        name: "cover",
        maxCount: 1,
        maxSize: FILE_MAX_SIZES.COVER,
        types: ["image/jpeg", "image/png"]
      }
    ]
  });

router.post(
  "/",
  protect(ROLES.MEMBER),
  upload,
  parseMemberFormData,
  validate(createMemberSchema),
  asyncHandler(createMember)
)

router.patch(
  "/:id",
  validate(idParamSchema,"params"),
  protect(ROLES.MEMBER),
  upload,
  parseMemberFormData,
  validate(updateMemberSchema),
  asyncHandler(updateMember)
)

router.get("/", asyncHandler(getAllMembers));
router.get("/:id", validate(idParamSchema,"params"), asyncHandler(getMemberById));

export default router