import multer from "multer";
import { BadRequestError } from "../errors/index.js";
import { MAX_SIZE_CAP } from "../constants/media.constants.js";
import { validateFile } from "../utils/media.validators.js";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_SIZE_CAP,
  },
});

const isMultipart = (req) =>
  (req.headers["content-type"] || "")
    .toLowerCase()
    .startsWith("multipart/form-data");

/**
 * @typedef {Object} UploadField
 * @property {string} name - Multipart field name.
 * @property {number} [maxCount=10] - Maximum number of files allowed.
 * @property {boolean} [required=false] - Whether at least one file is required.
 * @property {number} [maxSize] - Maximum file size in bytes.
 * @property {string[]} [types] - Allowed MIME types.
 */

/**
 * Creates multipart upload middleware.
 *
 * Validates and processes uploaded files, then stores them in req.media.
 *
 * @param {Object} [options={}] - Upload middleware configuration.
 * @param {UploadField[]} [options.fields=[]] - File fields to accept.
 * @returns {import("express").RequestHandler} Express middleware.
 */

export const createUpload = ({ fields = [] } = {}) => {
  return (req, res, next) => {
    if (!isMultipart(req)) return next();

    const multerFields = fields.map((field) => ({
      name: field.name,
      maxCount: field.maxCount ?? 10,
    }));

    upload.fields(multerFields)(req, res, (err) => {
      if (err) return next(err);
      req.media = {};
      try {
        for (const field of fields) {
          const rawFiles = req.files?.[field.name] || [];
          const validatedFiles = [];
          for (const file of rawFiles) {
            validateFile(file, field);
            validatedFiles.push({name:file.fieldname, ...file});
          }
          if (field.required && validatedFiles.length === 0) {
            throw new BadRequestError(`${field.name} is required`);
          }
          req.media[field.name] = validatedFiles;
        }

        next();
      } catch (err) {
        next(err);
      }
    });
  };
};