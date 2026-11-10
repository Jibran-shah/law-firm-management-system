import {
  createClientStory as createClientStoryService,
  updateClientStory as updateClientStoryService,
  getClientStory as getClientStoryService,
  getAllClientStories as getAllClientStoriesService,
  deleteClientStory as deleteClientStoryService,
} from "./clientStories.service.js";

export const createClientStory = async (req, res) => {
  const data = req.validated?.body;
  console.log("inside create client story", req.user)
  const user = req.user.id;
  const clientStory = await createClientStoryService({data, user});
  res.status(201).json({
    success: true,
    message: "Client story created successfully",
    data: { 
      clientStory
    },
  });
};

export const updateClientStory = async (req, res) => {
  const id = req.validated?.params?.id
  const data = req.validated?.body;
  const clientStory = await updateClientStoryService(
    id,
    data
  );

  res.status(200).json({
    success: true,
    message: "Client story updated successfully",
    data: {
      clientStory
    },
  });
};

export const getClientStoryById = async (req, res) => {
  const id = req.validated?.params?.id;
  const clientStory = await getClientStoryService(id);
  res.status(200).json({
    success: true,
    data: {
      clientStory
    },
  });
};

export const getAllClientStories = async (req, res) => {
  const { clientStories, pagination }  = await getAllClientStoriesService(req.validated?.query);
  res.status(200).json({
    success: true,
    data: {
      clientStories,
      pagination
    },
  });
};

export const deleteClientStory = async (req, res) => {
  await deleteClientStoryService(req.validated?.params?.id);

  res.status(200).json({
    success: true,
    message: "Client story deleted successfully",
  });
};