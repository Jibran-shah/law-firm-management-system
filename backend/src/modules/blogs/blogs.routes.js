import { Router } from "express";
import {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
} from "./blogs.controller.js";
import { protect } from "../../middlewares/protect.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createBlogSchema, updateBlogSchema } from "./blogs.validation.js";
import { createUpload } from "../../middlewares/upload.middleware.js";
import { FILE_MAX_SIZES } from "../../constants/media.constants.js";

const router = Router();

const upload = createUpload({
    fields:[
      {
        name: "image",
        maxCount: 1,
        maxSize: FILE_MAX_SIZES.AVATAR,
        types: ["image/jpeg", "image/png"]
      }
    ]
  });


router.post("/", protect("member"), upload, validate(createBlogSchema), asyncHandler(createBlog));
router.patch("/:id", protect("member"), upload, validate(updateBlogSchema), asyncHandler(updateBlog));
router.get("/:id", getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", deleteBlog);

export default router;