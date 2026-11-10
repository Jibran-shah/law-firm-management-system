import { Router } from "express";
import {
  createClientStory,
  updateClientStory,
  getAllClientStories,
  deleteClientStory,
  getClientStoryById,
} from "./clientStories.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createClientStorySchema, getAllClientStoriesSchema, updateClientStorySchema } from "./clientStories.validation.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { protect } from "../../middlewares/protect.middleware.js";
import { idParamSchema } from "../../schemas/params.schema.js";

const router = Router();

router.post("/",protect(), validate(createClientStorySchema), asyncHandler(createClientStory));
router.patch("/:id", validate(idParamSchema, "params"), validate(updateClientStorySchema), asyncHandler(updateClientStory));
router.get("/:id", validate(idParamSchema, "params"), asyncHandler(getClientStoryById));
router.get("/",validate(getAllClientStoriesSchema,"query"), asyncHandler( getAllClientStories));
router.delete("/:id", validate(idParamSchema, "params"), asyncHandler(deleteClientStory));

export default router;