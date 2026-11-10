import * as clientsService from "./clients.service.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const createClient = async (req, res) => {
  const client = await clientsService.createClient({
    media: req.media,
    data: req.validated?.body,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    data: {
      client,
    },
  });
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const updateClient = async (req, res) => {
  const id = req.validated?.params?.id;

  const client = await clientsService.updateClient({
    id,
    media: req.media,
    data: req.validated?.body,
    user: req.user,
  });

  res.status(200).json({
    success: true,
    data: {
      client,
    },
  });
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getClient = async (req, res) => {
  const id = req.validated?.params?.id;

  const client = await clientsService.getClient({ id });

  res.status(200).json({
    success: true,
    data: {
      client,
    },
  });
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAllClients = async (req, res) => {
  const clients = await clientsService.getAllClients({
    query: req.validated?.query,
    user: req.user,
  });

  res.status(200).json({
    success: true,
    data: {
      clients,
    },
  });
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const deleteClient = async (req, res) => {
  const id = req.validated?.params?.id;

  await clientsService.deleteClient({
    id,
    user: req.user,
  });

  res.status(200).json({
    success: true,
    message: "Client deleted successfully",
  });
};