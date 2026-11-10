import { UnauthorizedError } from "../../errors/index.js";
import { uploadFiles } from "../files/files.service.js";
import { Member } from "../members/Member.model.js";
import { Blog } from "./Blog.model.js"

export const createBlog = async ({ user, media, data }) => {
  const author = await Member.findOne({
    user:user.id
  })
  if(!author){
    throw new UnauthorizedError("user is not a member of law firm");
  }

  let image;
  if(media.image.length){
    console.log(user)
    const files = await uploadFiles({
      files:media.image,
      user:user,
      namespace:"law-firm/image",
      provider:"cloudinary"
    })
    image = files[0]
  }

  return await Blog.create({ author, ...(image)?{image}:{}, ...data});
};

export const updateBlog = async ({ media, user, id, data }) => {
  let image;
  if(media.image.length){
    const files = await uploadFiles({
      files: media.image,
      user: user.id,
      namespace:"blog/card/image",
      provider:"cloudinary"
    })
    image = files[0];
  }

  const blog = await Blog.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!blog) {
    const error = new Error("Blog not found");
    error.statusCode = 404;
    throw error;
  }

  return blog;
};

export const getBlog = async (id) => {
  const blog = await Blog.findById(id)
    .populate("image")
    .populate("author");

  if (!blog) {
    const error = new Error("Blog not found");
    error.statusCode = 404;
    throw error;
  }

  return blog;
};

export const getAllBlogs = async (query = {}) => {
  const { page = 1, limit = 10, search, status, author } = query;

  const currentPage = Math.max(1, Number(page) || 1);
  const perPage = Math.min(100, Math.max(1, Number(limit) || 10));

  const filter = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (status) {
    filter.status = status;
  }

  if (author) {
    filter.author = author;
  }

  const [blogs, total] = await Promise.all([
    Blog.find(filter)
      .populate("image")
      .populate("author")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage),
    Blog.countDocuments(filter),
  ]);

  return {
    blogs,
    pagination: {
      total,
      page: currentPage,
      limit: perPage,
      totalPages: Math.ceil(total / perPage),
    },
  };
};

export const deleteBlog = async (id) => {
  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    const error = new Error("Blog not found");
    error.statusCode = 404;
    throw error;
  }

  return blog;
};