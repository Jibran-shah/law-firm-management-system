import { BadRequestError } from "../errors/index.js";

export const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const payload = req[property];

    console.log(payload)

    if (payload === undefined || payload === null) {
      return next(
        new BadRequestError(
          `${property} is required but was not provided`
        )
      );
    }
    const result = schema.safeParse(payload);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
        type: issue.code,
      }));
      return next(new BadRequestError("Validation failed", errors));
    }

    req.validated = req.validated || {};
    req.validated[property] = result.data;

    next();
  };
};