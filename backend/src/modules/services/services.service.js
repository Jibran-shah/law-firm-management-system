import { NAMESPACES } from "../../constants/media.constants.js";
import { NotFoundError } from "../../errors/Http.error.js";
import { deleteFile, uploadFiles } from "../files/files.service.js";
import { Service } from "./Service.model.js";

export const createService = async ({ media, data, user }) => {
  const [image] = await uploadFiles({
    files: media?.image,
    user,
    namespace: NAMESPACES.SERVICE_IMAGE,
    provider: "cloudinary",
  });

  const service = await Service.create({
    ...data,
    image: image?._id,
  });

  return service;
};

export const updateService = async ({ id, media, data, user }) => {
  const service = await Service.findById(id);

  if (!service) {
    throw new NotFoundError("Service not found");
  }

  let image;

  if (media?.image?.length) {
    if (service.image) {
      await deleteFile(service.image);
    }

    const files = await uploadFiles({
      files: media.image,
      user,
      namespace: NAMESPACES.SERVICE_IMAGE,
      provider: "cloudinary",
    });

    image = files[0];
  }

  Object.assign(service, data);

  if (image) {
    service.image = image._id;
  }

  await service.save();

  return service;
};

export const getService = async ({ id }) => {
  const service = await Service.findById(id).populate("image");

  if (!service) {
    throw new NotFoundError("Service not found");
  }

  return service;
};

export const getAllServices = async ({ query = {} } = {}) => {
  const { page = 1, limit = 10, search, isActive } = query;

  const currentPage = Math.max(1, Number(page) || 1);
  const perPage = Math.min(100, Math.max(1, Number(limit) || 10));

  const filter = {};

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  if (isActive !== undefined) {
    filter.isActive = isActive === true || isActive === "true";
  }

  const [services, total] = await Promise.all([
    Service.find(filter)
      .populate("image")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage),
    Service.countDocuments(filter),
  ]);

  return {
    services,
    pagination: {
      total,
      page: currentPage,
      limit: perPage,
      totalPages: Math.ceil(total / perPage),
    },
  };
};

export const deleteService = async ({ id }) => {
  const service = await Service.findById(id);

  if (!service) {
    throw new NotFoundError("Service not found");
  }

  if (service.image) {
    await deleteFile(service.image);
  }

  await service.deleteOne();

  return service;
};