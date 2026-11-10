import { UnauthorizedError } from "../../errors/Http.error.js";
import { Client } from "../clients/Client.model.js";
import { ClientStory } from "./ClientStory.model.js";

export const createClientStory = async ({data, user}) => {
  const client = await Client.findOne({
    user:user
  })
  if(!client){
    throw UnauthorizedError("user is not a client");
  }
  return await ClientStory.create({ ...data, client});
};

export const updateClientStory = async (id, data) => {
  const clientStory = await ClientStory.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!clientStory) {
    const error = new Error("Client story not found");
    error.statusCode = 404;
    throw error;
  }

  return clientStory;
};

export const getClientStory = async (id) => {
  const clientStory = await ClientStory.findById(id)
    .populate("client")
    .populate("service");

  if (!clientStory) {
    const error = new Error("Client story not found");
    error.statusCode = 404;
    throw error;
  }

  return clientStory;
};

export const getAllClientStories = async (query = {}) => {
  const { page = 1, limit = 10, search, client, service, isPublished } = query;

  const filter = {};

  if (client) filter.client = client;
  if (service) filter.service = service;

  if (isPublished !== undefined) {
    filter.isPublished = isPublished === true || isPublished === "true";
  }

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  const currentPage = Math.max(1, Number(page) || 1);
  const perPage = Math.min(100, Math.max(1, Number(limit) || 10));

  const [clientStories, total] = await Promise.all([
    ClientStory.find(filter)
      .populate({
        path:"client",
        select:"name avatar",
        populate:{
          path:"avatar",
          select:"url"
        }
      })
      .populate({
        path:"service",
        select:"title"
      })
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage),
    ClientStory.countDocuments(filter),
  ]);

  return {
    clientStories,
    pagination: {
      total,
      page: currentPage,
      limit: perPage,
      totalPages: Math.ceil(total / perPage),
    },
  };
};

export const deleteClientStory = async (id) => {
  const clientStory = await ClientStory.findByIdAndDelete(id);

  if (!clientStory) {
    const error = new Error("Client story not found");
    error.statusCode = 404;
    throw error;
  }

  return clientStory;
};

