import { File } from "./File.model.js";
import { uploadFilesToS3, uploadFilesToCloudinary, deleteFromCloudinary } from "./storage.service.js";

const getResourceType = (mimetype) => {
  if (mimetype.startsWith("image/")) return "image";
  if (mimetype.startsWith("video/")) return "video";
  return "raw";
};

export const uploadFiles = async ({
  files,
  user,
  namespace,
  provider = "cloudinary",
  resourceType,
  deliveryType = "upload",
}) => {
  if (!files?.length) return [];

  const userId = user.id ?? user._id;

  let uploadedFiles;

  if (provider === "cloudinary") {
    uploadedFiles = await uploadFilesToCloudinary({
      files,
      userId,
      namespace,
      resourceType,
      deliveryType,
    });
  } else if (provider === "s3") {
    uploadedFiles = await uploadFilesToS3({
      files,
      userId,
      namespace,
    });
  } else {
    throw new Error(`Unsupported storage provider: ${provider}`);
  }

  const documents = uploadedFiles.map((uploaded, index) => {
    const file = files[index];

    return {
      user: userId,
      namespace,
      storageProvider: provider,
      storageKey: uploaded.storageKey ?? uploaded.publicId,
      url: uploaded.url,
      resourceType:
        uploaded.resourceType ?? getResourceType(file.mimetype),
      storageMetadata: {
        ...(provider === "cloudinary"
          ? {
              assetId: uploaded.assetId,
              deliveryType: uploaded.deliveryType,
              format: uploaded.format,
              bytes: uploaded.bytes,
            }
          : {}),
      },
    };
  });

  return File.insertMany(documents);
};



export const deleteFile = async (id) => {
  const file = await File.findById(id);
  if (!file) {
    const error = new Error("File not found");
    error.statusCode = 404;
    //TODO log not throw error
    throw error;
  }

  if (file.storageProvider === "cloudinary") {
    await deleteFromCloudinary({
      publicId: file.storageKey,
      resourceType: file.resourceType,
      deliveryType: file.storageMetadata?.deliveryType ?? "upload",
    });
  } else if (file.storageProvider === "s3") {
    await deleteFromS3(file.storageKey);
  } else {
    throw new Error(
      `Unsupported storage provider: ${file.storageProvider}`
    );
  }

  await file.deleteOne();

  return { success: true };
};