import path from "path";
import crypto from "crypto";
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { ENV } from "../../config/env.js";
import { s3 } from "../../config/s3Client.js";
import cloudinary from "../../config/cloudinary.js";
import { _file } from "zod/v4/core";
import { Readable } from "stream";

export function generateS3Key({fileName, userId, namespace}) {
  const fileExtension = path.extname(fileName);
  const baseName = path.basename(fileName, fileExtension)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-");
  const uniqueId = crypto.randomBytes(4).toString("hex");
  return `${userId}/${namespace}/${baseName}-${uniqueId}${fileExtension}`;
}

export function getPublicUrlS3(key) {
  const bucketName = ENV.AWS_S3_BUCKET_NAME;
  const region = ENV.AWS_REGION;
  return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
}

/**
 * @param {Object|Array} files - Single file object or array of file objects { buffer, key, mimeType }
 */
export const uploadFilesToS3 = async ({ namespace, files, userId }) => {
  const uploadPromises = files.map(async (file) => {
    const Key = generateS3Key({fileName:file.name, namespace, userId});
    const command = new PutObjectCommand({
      Bucket: ENV.AWS_S3_BUCKET_NAME,
      Key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    await s3.send(command);
    return { url: getPublicUrlS3(Key), storageKey:Key };
  });
  return await Promise.all(uploadPromises);
}

export async function getFileStreamFromS3(storageKey) {
  const downloadParams = {
    Bucket: ENV.AWS_S3_BUCKET_NAME,
    Key: storageKey,
  };
  try {
    const command = new GetObjectCommand(downloadParams);
    const response = await s3.send(command);
    return response.Body;
  } catch (error) {
    console.error("Error retrieving file:", error);
    throw error;
  }
}

export async function deleteFromS3(storageKey) {
  const deleteParams = {
    Bucket: ENV.AWS_S3_BUCKET_NAME,
    Key: storageKey,
  };

  try {
    const command = new DeleteObjectCommand(deleteParams);
    await s3.send(command);
    console.log("File deleted successfully");
    return { success: true };
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}

export const uploadToCloudinary = (
  {
    file,
    userId,
    namespace,
    resourceType = "image",
    deliveryType = "upload",
  } = {}
) => {
  const uniqueId = crypto.randomBytes(4).toString("hex");
  const _fileName = `${namespace}-${uniqueId}`;
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        asset_folder: userId,
        resource_type: resourceType,
        type: deliveryType,
        public_id:_fileName,
        unique_filename:true
      },
      (error, result) => {
        if (error) {
            console.dir(error, { depth: null });
            console.log("HTTP code:", error.http_code);
            console.log("Message:", error.message);
          return reject(error);
        }

        resolve({
          assetId: result.asset_id,
          publicId: result.public_id,
          resourceType: result.resource_type,
          deliveryType: result.type,
          format: result.format,
          bytes: result.bytes,
          url: result.secure_url,
        });
      }
    );

    Readable.from(file.buffer).pipe(stream);
  });
};

export const uploadFilesToCloudinary = async ({
  filename,
  files,
  resourceType = "image",
  deliveryType = "upload",
  userId,
  namespace
}) => {
  return Promise.all(
    files.map((file) =>
      uploadToCloudinary({
        file,
        namespace,
        userId,
        filename,
        resourceType,
        deliveryType,
      })
    )
  );
};


export const deleteFromCloudinary = async ({
  publicId,
  resourceType = "image",
  deliveryType = "upload",
}) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      type: deliveryType,
    });

    if (result.result !== "ok" && result.result !== "not found") {
      throw new Error(`Cloudinary deletion failed: ${result.result}`);
    }

    return {
      success: true,
      result: result.result,
    };
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    throw error;
  }
};