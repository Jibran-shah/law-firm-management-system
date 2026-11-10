import { NAMESPACES } from "../../constants/media.constants.js";
import { NotFoundError } from "../../errors/Http.error.js";
import { deleteFile, uploadFiles } from "../files/files.service.js";
import { Client } from "./Client.model.js";

export const createClient = async ({ media, user, data }) => {
  const [avatar] = await uploadFiles({
    files: media.avatar,
    user,
    namespace: NAMESPACES.CLIENT_AVATAR,
    provider: "cloudinary",
  });

  const [cover] = await uploadFiles({
    files: media.cover,
    user,
    namespace: NAMESPACES.CLIENT_COVER,
    provider: "cloudinary",
  });

  const client = await Client.create({
    ...data,
    user: user.id,
    avatar: avatar?._id,
    cover: cover?._id,
  });

  return client;
};

export const updateClient = async ({ id, media, user, data }) => {
  const client = await Client.findById(id);

  if (!client) {
    throw new NotFoundError("Client not found");
  }

  let avatar;
  let cover;

  if (media.avatar?.length) {
    if (client.avatar) {
      await deleteFile(client.avatar);
    }

    const files = await uploadFiles({
      files: media.avatar,
      user,
      namespace: NAMESPACES.CLIENT_AVATAR,
      provider: "cloudinary",
    });

    avatar = files[0];
  }

  if (media.cover?.length) {
    if (client.cover) {
      await deleteFile(client.cover);
    }

    const files = await uploadFiles({
      files: media.cover,
      user,
      namespace: NAMESPACES.CLIENT_COVER,
      provider: "cloudinary",
    });

    cover = files[0];
  }

  const updatedClient = await Client.findByIdAndUpdate(
    id,
    {
      ...data,
      user: user.id,
      ...(avatar && { avatar: avatar._id }),
      ...(cover && { cover: cover._id }),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedClient;
};

export const getClient = async ({ id }) => {
  const client = await Client.findById(id)
    .populate("avatar")
    .populate("cover");

  if (!client) {
    throw new NotFoundError("Client not found");
  }

  return client;
};

export const getAllClients = async ({ query = {} } = {}) => {
  const { page = 1, limit = 10, search } = query;

  const currentPage = Math.max(1, Number(page) || 1);
  const perPage = Math.min(100, Math.max(1, Number(limit) || 10));

  const filter = {};

  if (search) {
    filter.fullName = { $regex: search, $options: "i" };
  }

  const [clients, total] = await Promise.all([
    Client.find(filter)
      .populate("avatar")
      .populate("cover")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage),

    Client.countDocuments(filter),
  ]);

  return {
    clients,
    pagination: {
      total,
      page: currentPage,
      limit: perPage,
      totalPages: Math.ceil(total / perPage),
    },
  };
};

export const deleteClient = async ({ id }) => {
  const client = await Client.findById(id);

  if (!client) {
    throw new NotFoundError("Client not found");
  }

  if (client.avatar) {
    await deleteFile(client.avatar);
  }

  if (client.cover) {
    await deleteFile(client.cover);
  }

  await Client.findByIdAndDelete(id);

  return client;
};