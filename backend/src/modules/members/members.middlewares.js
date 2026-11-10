export const parseMemberFormData = (req, res, next) => {
  try {
    for (const field of ["contactInfo", "location"]) {
      if (typeof req.body[field] === "string") {
        req.body[field] = JSON.parse(req.body[field]);
      }
    }

    next();
  } catch {
    res.status(400).json({
      success: false,
      error: {
        message: "Invalid JSON in contactInfo or location",
        code: "BAD_REQUEST",
      },
    });
  }
};