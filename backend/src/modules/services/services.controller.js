import * as servicesService from "./services.service.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const createService = async (req, res) => {
  const service = await servicesService.createService({
    media: req.media,
    data: req.validated?.body,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    data: {
      service,
    },
  });
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const updateService = async (req, res) => {
  console.log("inside service update",req.user);
  const service = await servicesService.updateService({
    id: req.validated?.params?.id,
    media: req.media,
    data: req.validated?.body,
    user: req.user,
  });

  res.status(200).json({
    success: true,
    data: {
      service,
    },
  });
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getService = async (req, res) => {
  const service = await servicesService.getService({
    id: req.validated?.params?.id,
  });

  res.status(200).json({
    success: true,
    data: {
      service,
    },
  });
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAllServices = async (req, res) => {
  const result = await servicesService.getAllServices({
    query: req.validated?.query,
    user: req.user,
  });

  res.status(200).json({
    success: true,
    data: result,
  });
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const deleteService = async (req, res) => {
  await servicesService.deleteService({
    id: req.validated?.params?.id,
    user: req.user,
  });

  res.status(200).json({
    success: true,
    message: "Service deleted successfully",
  });
};