import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  const payload = {
    id:user._id||user.id,
    email:user.email,
    username:user.username,
    role:user.role
  }
  return jwt.sign(
    payload, 
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRES_IN|| "7d"}
  );
};

export const verifyAccessToken = (token) => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET
  );
};