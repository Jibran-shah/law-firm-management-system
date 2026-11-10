import {
  createBlog as createBlogService,
  updateBlog as updateBlogService,
  getBlog as getBlogService,
  getAllBlogs as getAllBlogsService,
  deleteBlog as deleteBlogService,
} from "./blogs.service.js";

export const createBlog = async (req, res) => {
  const blog = await createBlogService({
    data:req.validated?.body,
    user:req.user,
    media:req.media
  });

  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    data:{ blog },
  });
};

export const updateBlog = async (req, res) => {
  const user = req.user;
  const blog = await updateBlogService({ id: req.params.id, user, data: req.validated?.body, media:req.media});
  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    data: blog,
  });
};

export const getBlog = async (req, res) => {
  const blog = await getBlogService(req.params.id);

  res.status(200).json({
    success: true,
    data: blog,
  });
};

export const getAllBlogs = async (req, res) => {
  const result = await getAllBlogsService(req.query);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const deleteBlog = async (req, res) => {
  await deleteBlogService(req.params.id);

  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
};